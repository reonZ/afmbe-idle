import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE, ActorDataSchema } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type {
    AdversarySource,
    CharacterSource,
    CREATURE_ATTRIBUTES,
    CREATURE_SECONDARY_ATTRIBUTES,
    CreatureDataModel,
    ZombieSource,
} from ".";

type CreatureAttribute = (typeof CREATURE_ATTRIBUTES)[number];
type CreatureSecondaryAttribute = (typeof CREATURE_SECONDARY_ATTRIBUTES)[number];

type CreatureDataSchema = ActorDataSchema & {
    life: PositiveIntergerValueField;
};

type CreatureDataSource = ModelPropsFromSchema<CreatureDataSchema>;

type CreatureSystem = {
    attributes: CreatureAttributes;
    life: { value: number; total: number };
};

type CreatureAttributes = Record<CreatureAttribute, number>;
type CreatureSecondaryAttributes = Record<CreatureSecondaryAttribute, { value: number; max?: number }>;

declare abstract class Creature<
    TParent extends TokenDocument | null = TokenDocument | null,
> extends ActorAFMBE<TParent> {
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
