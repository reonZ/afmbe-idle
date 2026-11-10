import { ActorDataModel } from "actor";
import { PositiveIntergerValueField } from "fields";
import { calculateTotalLife, Creature, CreatureDataSchema, CreatureSystem } from ".";

class CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends ActorDataModel<TParent, TSchema> {
    static defineSchema(): CreatureDataSchema {
        return {
            ...super.defineSchema(),
            life: new PositiveIntergerValueField(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();

        this.life.total = calculateTotalLife(this.parent);
    }
}

interface CreatureDataModel<TParent extends Creature, TSchema extends CreatureDataSchema> extends CreatureSystem {}

export { CreatureDataModel };
