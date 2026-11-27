import type {
    DocumentUUIDField,
    ModelPropsFromSchema,
    NumberField,
    SchemaField,
    SourceFromSchema,
    StringField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import { ItemUUID } from "@7h3laughingman/foundry-types/common/documents/_module.mjs";
import type { ActorAFMBE, ActorDataSchema, CharacterSource, ZombieSource } from "actor";
import type { BooleanField, PositiveIntergerValueField } from "fields";
import type { TokenDocumentAFMBE } from "misc";
import { TaskTargetSchema } from "roll";
import type {
    CREATURE_ATTRIBUTES,
    CREATURE_MODIFIER_AFFECTS,
    CREATURE_SECONDARIES,
    CREATURE_TASK_CATEGORIES,
    CreatureDataModel,
} from ".";

type CreatureTaskCategory = (typeof CREATURE_TASK_CATEGORIES)[number];
type CreatureModifierAffects = (typeof CREATURE_MODIFIER_AFFECTS)[number];

type CreatureModifierTargetsSchema = Omit<TaskTargetSchema, "value">;

type CreatureModifierTargets = ModelPropsFromSchema<CreatureModifierTargetsSchema>;

type CreatureModifierSchema = {
    active: BooleanField;
    affects: StringField<CreatureModifierAffects, CreatureModifierAffects, true, false, true>;
    label: StringField<string, string, true, false, false>;
    origin: DocumentUUIDField<ItemUUID>;
    targets: SchemaField<
        CreatureModifierTargetsSchema,
        SourceFromSchema<CreatureModifierTargetsSchema>,
        CreatureModifierTargets,
        false,
        true,
        true
    >;
    value: NumberField<number, number, true, false, true>;
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

declare abstract class CreatureAFMBE<
    TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null,
> extends ActorAFMBE<TParent> {
    system: CreatureDataModel;
}

type CreatureSource = CharacterSource | ZombieSource;

export type {
    CreatureAFMBE,
    CreatureAttributeType,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureModifier,
    CreatureModifierSchema,
    CreatureModifierTargets,
    CreatureModifierTargetsSchema,
    CreatureModifierAffects,
    CreatureSecondaryAttributes,
    CreatureSecondaryType,
    CreatureSource,
    CreatureTaskCategory,
};
