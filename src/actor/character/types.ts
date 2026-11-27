import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { AdversarySource, CreatureAFMBE, CreatureDataSchema, MemberSource } from "actor";
import type { TokenDocumentAFMBE } from "misc";
import type { CharacterDataModel } from ".";

type CharacterDataSchema = CreatureDataSchema & {};

type CharacterDataSource = ModelPropsFromSchema<CharacterDataSchema>;

declare class CharacterAFMBE<
    TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null,
> extends CreatureAFMBE<TParent> {
    system: CharacterDataModel;
}

type CharacterSource = AdversarySource | MemberSource;

export type { CharacterAFMBE, CharacterDataSchema, CharacterDataSource, CharacterSource };
