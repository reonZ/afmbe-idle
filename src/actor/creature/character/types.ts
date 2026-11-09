import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/actor.mjs";
import type { Creature, CreatureDataSchema } from "actor";
import type {
    CHARACTER_TYPES,
    CharacterAttributes,
    CharacterAttributesField,
    CharacterDataModel,
    CharacterExperience,
    CharacterExperienceField,
} from ".";
import fields = foundry.data.fields;

type CharacterDetailsSchema = {
    description: fields.HTMLField;
    personality: fields.HTMLField;
    quote: fields.HTMLField;
};

type CharacterType = (typeof CHARACTER_TYPES)[number];

type CharacterDataSchema = CreatureDataSchema & {
    attributes: CharacterAttributesField;
    details: fields.SchemaField<CharacterDetailsSchema>;
    experience: CharacterExperienceField;
    type: fields.StringField<CharacterType, CharacterType, true, false, true>;
};

type CharacterDataSource = fields.ModelPropsFromSchema<CharacterDataSchema>;

type CharacterSystemDetails = fields.ModelPropsFromSchema<CharacterDetailsSchema>;

declare class Character<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    attributes: CharacterAttributes;
    details: CharacterSystemDetails;
    experience: CharacterExperience;
    system: CharacterDataModel;
    type: CharacterType;
}

type CharacterSource = ActorSource<"character", CharacterDataSource>;

export type { Character, CharacterDataSchema, CharacterDataSource, CharacterSource, CharacterType };
