import type {
    ModelPropsFromSchema,
    NumberField,
    SourceFromSchema,
    StringField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE, ActorDataSchema, CharacterSource, ZombieSource } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { TokenDocumentAFMBE } from "misc";
import type {
    CREATURE_ATTRIBUTES,
    CREATURE_MODIFIER_TYPES,
    CREATURE_SECONDARIES,
    CREATURE_TASK_CATEGORIES,
    CreatureDataModel,
} from ".";

type CreatureTaskCategory = (typeof CREATURE_TASK_CATEGORIES)[number];
type CreatureModifierType = (typeof CREATURE_MODIFIER_TYPES)[number];

type CreatureModifierSchema = {
    id: StringField<string, string, true, false, false>;
    label: StringField<string, string, true, false, false>;
    value: NumberField<number, number, true, false, false>;
    type: StringField<CreatureModifierType, CreatureModifierType, true, false, true>;
};

type CreatureModifier = SourceFromSchema<CreatureModifierSchema>;

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
    CreatureModifierSchema,
    CreatureSecondaryAttributes,
    CreatureSecondaryType,
    CreatureSource,
    CreatureTaskCategory,
};
