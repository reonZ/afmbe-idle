import { ActorDataModel, ActorModules } from "actor";
import { PositiveIntergerValueField } from "fields";
import { Creature, CreatureDataSchema, CreatureEndurance, CreatureLife, CreatureSystem } from ".";
import * as R from "remeda";
import { CreatureEssence } from ".";

class CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends ActorDataModel<TParent, TSchema> {
    static modules = {
        endurance: CreatureEndurance,
        essence: CreatureEssence,
        life: CreatureLife,
    } satisfies ActorModules<Creature>;

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

        this.endurance.total = (constitution + strength + willpower) * 3 + 5;
        this.essence.total = R.sum(R.values(attributes));
        this.life.total = (constitution + strength) * 4 + 10;

        this.speed = {
            value: (constitution + dexterity) * 2,
        };
    }
}

interface CreatureDataModel<TParent extends Creature, TSchema extends CreatureDataSchema> extends CreatureSystem {}

export { CreatureDataModel };
