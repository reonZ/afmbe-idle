import type {
    HTMLField,
    ModelPropsFromSchema,
    SchemaField,
    SourceFromSchema,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/actor.mjs";
import type { Creature, CreatureAttributeType, CreatureDataSchema } from "actor";
import type { BooleanField, PositiveIntegerField, ValueAndTotalField } from "fields";
import type { CHARACTER_TYPES, CharacterDataModel } from ".";

type CharacterDetailsSchema = {
    description: HTMLField;
    personality: HTMLField;
    quote: HTMLField;
};

type CharacterAttributeSchema = {
    base: PositiveIntegerField;
    drawback: PositiveIntegerField;
    improved: BooleanField;
};

type CharacterAttributesSchema = Record<CreatureAttributeType, SchemaField<CharacterAttributeSchema>>;

type CharacterType = (typeof CHARACTER_TYPES)[number];

type CharacterDataSchema = CreatureDataSchema & {
    attributes: SchemaField<CharacterAttributesSchema>;
    details: SchemaField<CharacterDetailsSchema>;
    experience: ValueAndTotalField;
    type: StringField<CharacterType, CharacterType, true, false, true>;
};

type CharacterAttributeSource = SourceFromSchema<CharacterAttributeSchema>;
type CharacterAttributesSource = SourceFromSchema<CharacterAttributesSchema>;

type CharacterDataSource = ModelPropsFromSchema<CharacterDataSchema>;

declare class Character<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: CharacterDataModel;
}

type CharacterSource = ActorSource<"character", CharacterDataSource>;

export type {
    Character,
    CharacterAttributeSource,
    CharacterAttributesSource,
    CharacterDataSchema,
    CharacterDataSource,
    CharacterSource,
    CharacterType,
};
