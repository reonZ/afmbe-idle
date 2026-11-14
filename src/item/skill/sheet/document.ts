import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { Creature } from "actor";
import { ApplicationPartAFMBE } from "handlebars-application";
import { ItemSheetAFMBE } from "item";
import * as R from "remeda";
import { Skill, SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext } from "..";

class SkillSheet<TParent extends Skill<Creature | null> = Skill<Creature | null>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<SkillSheetConfiguration> = {
        classes: ["skill"],
        actions: {
            "add-specialty": this.#addSpecialty,
            "delete-specialty": this.#deleteSpecialty,
        },
    };

    static PARTS = {
        ...super.PARTS,
        details: {
            template: "systems/afmbe-idle/templates/item/skill/details.hbs",
            prepareContext: this.prepareDetailsContext,
        },
        level: {
            template: "systems/afmbe-idle/templates/item/skill/level.hbs",
            prepareContext: this.prepareLevelsContext,
        },
    } satisfies ApplicationPartAFMBE<SkillSheetPart, SkillSheetRenderContext>;

    static prepareDetailsContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        const system = this.item.system;

        if (system.isParent) {
            context.specialties = system.specialties.contents;
        } else {
            context.parent = {
                available: R.pipe(
                    this.actor?.itemTypes.skill ?? [],
                    R.filter((skill) => !skill.system.isSpeciality),
                    R.map((skill): FormSelectOption => {
                        return { label: skill.name, value: skill.id };
                    }),
                ),
                selected: system.parentSkill?.id,
            };
        }

        return context;
    }

    static prepareHeaderTemplate<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        const parent = this.item.system.parentSkill;
        context.name = parent ? `${parent.name} [${this.item.name}]` : this.item.name;
        return context;
    }

    static prepareLevelsContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        context.level = this.item.system.level.value;
        return context;
    }

    static async #addSpecialty(this: SkillSheet) {
        const specialty = await this.item.system.addSpecialty();
        specialty?.sheet.render(true);
    }

    static #deleteSpecialty(this: SkillSheet, _event: PointerEvent, target: HTMLElement) {
        const id = target.closest<HTMLElement>("[data-item-id]")?.dataset.itemId;
        this.actor?.deleteEmbeddedDocuments("Item", [id ?? ""]);
    }
}

export { SkillSheet };
