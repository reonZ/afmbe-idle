import type {
    HTMLField,
    ModelPropsFromSchema,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/actor.mjs";
import type { Creature, CreatureAttribute, CreatureDataSchema, CreatureSystem } from "actor";
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

type CharacterAttributesSchema = Record<CreatureAttribute, SchemaField<CharacterAttributeSchema>>;

type CharacterType = (typeof CHARACTER_TYPES)[number];

type CharacterDataSchema = CreatureDataSchema & {
    attributes: SchemaField<CharacterAttributesSchema>;
    details: SchemaField<CharacterDetailsSchema>;
    experience: ValueAndTotalField;
    type: StringField<CharacterType, CharacterType, true, false, true>;
};

type CharacterDataSource = ModelPropsFromSchema<CharacterDataSchema>;

type CharacterSystem = Omit<CharacterDataSource, "attributes" | "life"> & CreatureSystem;

declare class Character<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: CharacterDataModel;
}

type CharacterSource = ActorSource<"character", CharacterDataSource>;

export type { Character, CharacterDataSchema, CharacterDataSource, CharacterSource, CharacterSystem, CharacterType };
