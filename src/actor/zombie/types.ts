import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { Creature, CreatureDataSchema, ZombieDataModel } from "actor";
import type { TokenDocumentAFMBE } from "misc";

type ZombieDataSchema = CreatureDataSchema & {};

type ZombieDataSource = ModelPropsFromSchema<ZombieDataSchema>;

declare class Zombie<TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null> extends Creature<TParent> {
    system: ZombieDataModel;
}

type ZombieSource = ActorSource<"zombie", ZombieDataSource>;

export type { Zombie, ZombieDataSchema, ZombieDataSource, ZombieSource };
