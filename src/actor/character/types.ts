import type { ModelPropsFromSchema, SchemaField } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { AdversarySource, Creature, CreatureAttributesSchema, CreatureDataSchema, MemberSource } from "actor";
import type { CharacterDataModel } from ".";

type CharacterDataSchema = CreatureDataSchema & {
    // attributes: SchemaField<CreatureAttributesSchema>;
};

type CharacterDataSource = ModelPropsFromSchema<CharacterDataSchema>;

declare class Character<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: CharacterDataModel;
}

type CharacterSource = AdversarySource | MemberSource;

export type { Character, CharacterDataSchema, CharacterDataSource, CharacterSource };
