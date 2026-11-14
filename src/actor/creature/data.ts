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
    RollTaskApplication,
    RollTaskData,
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

    prepareBaseData(): void {
        super.prepareBaseData();

        // we override Creature#items#get to account for specialties
        // const getItem = this.parent.items.get.bind(this.parent.items);
        // this.parent.items.get = function (key: string, options?: EmbeddedCollectionGetOptions) {
        //     const [itemId, slug] = R.split(key, ".");
        //     const item = getItem(itemId, options);
        //     return slug && item?.isOfType("skill") ? item.system.specialties[slug] : item;
        // };
    }

    // we prepare secondary attributes after primary attributes have been prepared AND modified by active effects
    prepareDerivedData(): void {
        super.prepareDerivedData();

        this.endurance = new CreatureEndurance(this.parent);
        this.essence = new CreatureEssence(this.parent);
        this.life = new CreatureLife(this.parent);
        this.speed = new CreatureSpeed(this.parent);
    }

    rollTask(options?: RollTaskData): RollTaskApplication {
        return RollTaskApplication.roll(this.parent, options);
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
