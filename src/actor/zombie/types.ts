import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { CreatureAFMBE, CreatureDataSchema, ZombieDataModel } from "actor";
import type { TokenDocumentAFMBE } from "misc";

type ZombieDataSchema = CreatureDataSchema & {};

type ZombieDataSource = ModelPropsFromSchema<ZombieDataSchema>;

declare class ZombieAFMBE<
    TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null,
> extends CreatureAFMBE<TParent> {
    system: ZombieDataModel;
}

type ZombieSource = ActorSource<"zombie", ZombieDataSource>;

export type { ZombieAFMBE, ZombieDataSchema, ZombieDataSource, ZombieSource };
