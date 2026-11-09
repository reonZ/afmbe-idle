import type { Creature, CreatureDataSchema, ZombieDataModel } from "actor";

type ZombieDataSchema = CreatureDataSchema & {};

type ZombieDataSource = foundry.data.fields.ModelPropsFromSchema<ZombieDataSchema>;

interface Zombie<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: ZombieDataModel;
}

export type { Zombie, ZombieDataSchema, ZombieDataSource };
