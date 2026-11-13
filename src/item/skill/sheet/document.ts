import { ActorSheetConfiguration, Creature } from "actor";
import { Skill } from "..";
import { ItemSheetAFMBE } from "item";

abstract class SkillSheet<TParent extends Skill<Creature>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["skill"],
        position: {
            width: 480,
        },
        actions: {},
    };
}

export { SkillSheet };
