import { Creature } from "actor";
import { ApplicationPartAFMBE } from "handlebars-application";
import { ItemSheetAFMBE } from "item";
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
        context.specialties = this.item._source.system.specialties;
        return context;
    }

    static prepareLevelContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        context.level = this.item.system.bonus;
        return context;
    }

    static #addSpecialty(this: SkillSheet) {
        this.item.system.addSpecialty();
    }

    static #deleteSpecialty(this: SkillSheet, _event: PointerEvent, target: HTMLElement) {
        const index = target.closest<HTMLElement>("[data-index]")?.dataset.index;
        this.item.system.deleteSpecialtyByIndex(Number(index));
    }
}

export { SkillSheet };
