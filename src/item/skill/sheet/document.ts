import { Creature } from "actor";
import { ApplicationPartAFMBE } from "handlebars-application";
import { ItemSheetAFMBE } from "item";
import { Skill, SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext } from "..";

class SkillSheet<TParent extends Skill<Creature | null> = Skill<Creature | null>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<SkillSheetConfiguration> = {
        classes: ["skill"],
        actions: {},
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
        return context;
    }

    static prepareLevelContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        context.level = this.item.system.level.value;
        return context;
    }
}

export { SkillSheet };
