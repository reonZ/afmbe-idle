import { ActorSheetConfiguration, Creature } from "actor";
import { ItemParts, ItemSheetAFMBE } from "item";
import { Skill, SkillSheetPart, SkillSheetRenderContext } from "..";

abstract class SkillSheet<TParent extends Skill<Creature>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["skill"],
        position: {
            width: 480,
        },
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
    } satisfies ItemParts<SkillSheetPart, SkillSheetRenderContext>;

    static prepareDetailsContext<T extends SkillSheetRenderContext>(context: T): T {
        return context;
    }

    static prepareLevelContext<T extends SkillSheetRenderContext>(context: T): T {
        return context;
    }
}

export { SkillSheet };
