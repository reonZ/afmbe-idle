import { ActorSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { Creature, CreatureDataSchema, CreatureSystem, ZombieDataModel } from "actor";

type ZombieDataSchema = CreatureDataSchema & {};

type ZombieDataSource = foundry.data.fields.ModelPropsFromSchema<ZombieDataSchema>;

type ZombieSystem = CreatureSystem;

declare class Zombie<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: ZombieDataModel;
}

type ZombieSource = ActorSource<"zombie", ZombieDataSource>;

export type { Zombie, ZombieDataSchema, ZombieDataSource, ZombieSource, ZombieSystem };
