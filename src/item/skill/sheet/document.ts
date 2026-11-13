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
            prepareContext: this.prepareLevelContext,
        },
    } satisfies ApplicationPartAFMBE<SkillSheetPart, SkillSheetRenderContext>;

    static prepareDetailsContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        context.specialties = R.values(this.item.system.specialties);
        return context;
    }

    static prepareLevelContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        context.level = this.item.system.level.value;
        return context;
    }

    static #addSpecialty(this: SkillSheet) {
        this.item.system.addSpecialty();
    }

    static #deleteSpecialty(this: SkillSheet, _event: PointerEvent, target: HTMLElement) {
        const id = target.closest<HTMLElement>("[data-id]")?.dataset.id;
        this.item.system.deleteSpecialty(id ?? "");
    }
}

export { SkillSheet };
