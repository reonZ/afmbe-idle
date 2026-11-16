import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/_module.mjs";
import type { Character, CharacterDataSchema } from "actor";
import type { AdversaryDataModel } from ".";

type AdversaryDataSchema = CharacterDataSchema & {};

type AdversaryDataSource = ModelPropsFromSchema<AdversaryDataSchema>;

declare class Adversary<TParent extends TokenDocument | null = TokenDocument | null> extends Character<TParent> {
    system: AdversaryDataModel;
}

type AdversarySource = ActorSource<"adversary", AdversaryDataSource>;

export type { Adversary, AdversaryDataSchema, AdversaryDataSource, AdversarySource };
