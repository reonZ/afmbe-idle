import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE, ActorDataSchema } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type {
    AdversarySource,
    CharacterSource,
    CREATURE_ATTRIBUTES,
    CREATURE_SECONDARY_ATTRIBUTES,
    CreatureDataModel,
    CreatureEndurance,
    CreatureEssence,
    CreatureLife,
    CreatureSpeed,
    ZombieSource,
} from ".";

type CreatureAttribute = (typeof CREATURE_ATTRIBUTES)[number];
type CreatureSecondaryAttribute = (typeof CREATURE_SECONDARY_ATTRIBUTES)[number];

type CreatureDataSchema = ActorDataSchema & {
    endurance: PositiveIntergerValueField;
    essence: PositiveIntergerValueField;
    life: PositiveIntergerValueField;
};

type CreatureDataSource = ModelPropsFromSchema<CreatureDataSchema>;

type CreatureSystem = {
    attributes: CreatureAttributes;
    endurance: ValueAndTotal;
    essence: ValueAndTotal;
    life: ValueAndTotal;
    speed: { value: number };
};

type CreatureAttributes = Record<CreatureAttribute, number>;
type CreatureSecondaryAttributes = Record<CreatureSecondaryAttribute, { value: number; max?: number }>;

declare abstract class Creature<
    TParent extends TokenDocument | null = TokenDocument | null,
> extends ActorAFMBE<TParent> {
    endurance: CreatureEndurance;
    essence: CreatureEssence;
    life: CreatureLife;
    speed: CreatureSpeed;
    system: CreatureDataModel;
}

type CreatureSource = AdversarySource | CharacterSource | ZombieSource;

export type {
    Creature,
    CreatureAttribute,
    CreatureAttributes,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureSecondaryAttribute,
    CreatureSecondaryAttributes,
    CreatureSource,
    CreatureSystem,
};
