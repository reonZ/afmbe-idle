import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { AdversarySource, Creature, CreatureDataSchema, MemberSource } from "actor";
import type { CharacterDataModel } from ".";

type CharacterDataSchema = CreatureDataSchema & {};

type CharacterDataSource = ModelPropsFromSchema<CharacterDataSchema>;

declare class Character<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: CharacterDataModel;
}

type CharacterSource = AdversarySource | MemberSource;

export type { Character, CharacterDataSchema, CharacterDataSource, CharacterSource };
