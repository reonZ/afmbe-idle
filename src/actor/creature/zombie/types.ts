import { ActorSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { Creature, CreatureDataSchema, ZombieDataModel } from "actor";

type ZombieDataSchema = CreatureDataSchema & {};

type ZombieDataSource = foundry.data.fields.ModelPropsFromSchema<ZombieDataSchema>;

interface Zombie<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: ZombieDataModel;
}

type ZombieSource = ActorSource<"zombie", ZombieDataSource>;

export type { ZombieSource, Zombie, ZombieDataSchema, ZombieDataSource };
