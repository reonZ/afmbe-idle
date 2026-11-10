import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { Adversary, Character, Creature, CreatureSource, Zombie } from "actor";
import type { ACTOR_TYPES, ActorAFMBE, ActorModule } from ".";

type ActorType = (typeof ACTOR_TYPES)[number];

type ActorInstances = {
    adversary: Adversary;
    character: Character;
    creature: Creature;
    zombie: Zombie;
};

type ActorDataSchema = {};

type ActorDataSource = ModelPropsFromSchema<ActorDataSchema>;

type ActorSourceAFMBE = CreatureSource;

type ActorModules<TParent extends ActorAFMBE> = Partial<Record<keyof TParent, typeof ActorModule<TParent>>>;

export type { ActorDataSchema, ActorDataSource, ActorInstances, ActorModules, ActorSourceAFMBE, ActorType };
