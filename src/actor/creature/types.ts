import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE, ActorDataSchema, CharacterSource, ZombieSource } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { TokenDocumentAFMBE } from "misc";
import type { CREATURE_ATTRIBUTES, CREATURE_MODIFIER_TYPES, CREATURE_SECONDARIES, CreatureDataModel } from ".";

type CreatureModifierType = (typeof CREATURE_MODIFIER_TYPES)[number];

type CreatureModifier = {
    id: string;
    label: string;
    value: number;
    type: CreatureModifierType;
};

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
    TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null,
> extends ActorAFMBE<TParent> {
    system: CreatureDataModel;
}

type CreatureSource = CharacterSource | ZombieSource;

export type {
    Creature,
    CreatureAttributeType,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureModifier,
    CreatureModifierType,
    CreatureSecondaryAttributes,
    CreatureSecondaryType,
    CreatureSource,
};
