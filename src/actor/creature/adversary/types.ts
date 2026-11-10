import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/_module.mjs";
import type { Creature, CreatureDataSchema, CreatureSystem } from "actor";
import type { AdversaryDataModel } from ".";
import fields = foundry.data.fields;

type AdversaryDataSchema = CreatureDataSchema & {};

type AdversaryDataSource = fields.ModelPropsFromSchema<AdversaryDataSchema>;

type AdversarySystem = CreatureSystem;

declare class Adversary<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: AdversaryDataModel;
}

type AdversarySource = ActorSource<"character", AdversaryDataSource>;

export type { Adversary, AdversaryDataSchema, AdversaryDataSource, AdversarySource, AdversarySystem };
