import type { Creature, CreatureDataSchema, CreatureSystem, ZombieDataModel } from "actor";

type ZombieDataSchema = CreatureDataSchema & {};

type ZombieDataSource = foundry.data.fields.ModelPropsFromSchema<ZombieDataSchema>;

type ZombieSystem = CreatureSystem & {};

interface Zombie<TParent extends TokenDocument | null = TokenDocument | null> extends Creature<TParent> {
    system: ZombieDataModel;
}

export type { Zombie, ZombieDataSchema, ZombieDataSource, ZombieSystem };
