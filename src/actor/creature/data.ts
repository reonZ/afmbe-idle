import { ActorDataModel, ActorDataSource } from "actor";
import { PositiveIntergerValueField } from "fields";
import {
    Creature,
    CreatureAttributes,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureEndurance,
    CreatureEssence,
    CreatureLife,
    CreatureSpeed,
} from ".";

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

    // we prepare secondary attributes after primary attributes have been prepared AND modified by active effects
    prepareDerivedData(): void {
        super.prepareDerivedData();

        this.endurance = new CreatureEndurance(this.parent);
        this.essence = new CreatureEssence(this.parent);
        this.life = new CreatureLife(this.parent);
        this.speed = new CreatureSpeed(this.parent);
    }
}

interface CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends Omit<CreatureDataSource, keyof ActorDataSource> {
    attributes: CreatureAttributes;
    endurance: CreatureEndurance;
    essence: CreatureEssence;
    life: CreatureLife;
    speed: CreatureSpeed;
}

export { CreatureDataModel };
