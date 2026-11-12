import { ActorDataModel } from "actor";
import { PositiveIntergerValueField } from "fields";
import * as R from "remeda";
import { Creature, CreatureDataSchema, CreatureSystem } from ".";

class CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends ActorDataModel<TParent, TSchema> {
    static defineSchema(): CreatureDataSchema {
        return {
            ...super.defineSchema(),
            endurance: new PositiveIntergerValueField(),
            essence: new PositiveIntergerValueField(),
            life: new PositiveIntergerValueField(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();

        const attributes = this.parent.system.attributes;
        const { constitution, dexterity, strength, willpower } = attributes;

        this.endurance.max = (constitution + strength + willpower) * 3 + 5;
        this.essence.max = R.sum(R.values(attributes));
        this.life.max = (constitution + strength) * 4 + 10;

        this.speed = {
            value: (constitution + dexterity) * 2,
        };
    }
}

interface CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends CreatureSystem<TParent> {}

export { CreatureDataModel };
