import { ActorDataModel, ActorDataSource } from "actor";
import { TaskApplicationAFMBE, TaskApplicationData } from "application";
import { PositiveIntergerValueField } from "fields";
import {
    CreatureAFMBE,
    CreatureAttributes,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureEndurance,
    CreatureEssence,
    CreatureLife,
    CreatureModifier,
    CreatureSpeed,
} from ".";

class CreatureDataModel<
    TParent extends CreatureAFMBE = CreatureAFMBE,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends ActorDataModel<TParent, TSchema> {
    modifiers: CreatureModifier[] = [];

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

    rollTask(options?: TaskApplicationData): TaskApplicationAFMBE {
        return TaskApplicationAFMBE.create(this.parent, options);
    }
}

interface CreatureDataModel<
    TParent extends CreatureAFMBE = CreatureAFMBE,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends Omit<CreatureDataSource, keyof ActorDataSource> {
    attributes: CreatureAttributes;
    endurance: CreatureEndurance;
    essence: CreatureEssence;
    life: CreatureLife;
    speed: CreatureSpeed;
}

export { CreatureDataModel };
