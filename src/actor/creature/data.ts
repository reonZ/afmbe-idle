import { ActorDataModel } from "actor";
import { Creature, CreatureDataSchema, CreatureSystem } from ".";

class CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends ActorDataModel<TParent, TSchema> {
    static defineSchema(): CreatureDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface CreatureDataModel<TParent extends Creature, TSchema extends CreatureDataSchema> extends CreatureSystem {}

export { CreatureDataModel };
