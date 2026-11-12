import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE, ActorDataSchema, AdversarySource, CharacterSource, ZombieSource } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { CREATURE_ATTRIBUTES, CREATURE_SECONDARIES, CreatureDataModel } from ".";

type CreatureAttributeType = (typeof CREATURE_ATTRIBUTES)[number];
type CreatureSecondaryType = (typeof CREATURE_SECONDARIES)[number];

type CreatureDataSchema = ActorDataSchema & {
    endurance: PositiveIntergerValueField;
    essence: PositiveIntergerValueField;
    life: PositiveIntergerValueField;
};

type CreatureDataSource = ModelPropsFromSchema<CreatureDataSchema>;

type CreatureSecondaryAttributes = Record<CreatureSecondaryType, { value: number; max?: number }>;

declare abstract class Creature<
    TParent extends TokenDocument | null = TokenDocument | null,
> extends ActorAFMBE<TParent> {
    system: CreatureDataModel;
}

type CreatureSource = AdversarySource | CharacterSource | ZombieSource;

export type {
    Creature,
    CreatureAttributeType,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureSecondaryAttributes,
    CreatureSecondaryType,
    CreatureSource,
};
