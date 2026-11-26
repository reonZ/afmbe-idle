import { ActorDataModel, ActorDataSource } from "actor";
import { TaskApplication, TaskApplicationData } from "application";
import { PositiveIntergerValueField } from "fields";
import * as R from "remeda";
import {
    Creature,
    CREATURE_MODIFIER_TYPES,
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
    TParent extends Creature = Creature,
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

    /** because modifiers can be added via ActiveEffect */
    get validModifiers(): CreatureModifier[] {
        return R.pipe(
            this.modifiers,
            R.filter((modifier) => R.isString(modifier.label)),
            R.map((modifier) => {
                const type = R.isIncludedIn(modifier.type, CREATURE_MODIFIER_TYPES) ? modifier.type : "all";
                return { ...modifier, type };
            }),
        );
    }

    // we prepare secondary attributes after primary attributes have been prepared AND modified by active effects
    prepareDerivedData(): void {
        super.prepareDerivedData();

        this.endurance = new CreatureEndurance(this.parent);
        this.essence = new CreatureEssence(this.parent);
        this.life = new CreatureLife(this.parent);
        this.speed = new CreatureSpeed(this.parent);
    }

    rollTask(options?: TaskApplicationData): TaskApplication {
        return TaskApplication.create(this.parent, options);
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
