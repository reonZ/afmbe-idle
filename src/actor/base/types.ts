import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { Adversary, Character, Creature, CreatureSource, Zombie } from "actor";
import type { ItemInstances, ItemType } from "item";
import type { ACTOR_TYPES, ActorAFMBE, ActorModule } from ".";

type ActorType = (typeof ACTOR_TYPES)[number];

type ActorInstances<TParent extends TokenDocument | null = TokenDocument | null> = {
    adversary: Adversary<TParent>;
    character: Character<TParent>;
    creature: Creature<TParent>;
    zombie: Zombie<TParent>;
};

type ActorItemTypes = {
    [k in ItemType]: ItemInstances[k][];
};

type ActorDataSchema = {};

type ActorDataSource = ModelPropsFromSchema<ActorDataSchema>;

type ActorSourceAFMBE = CreatureSource;

type ActorModules<TParent extends ActorAFMBE> = Partial<Record<keyof TParent, typeof ActorModule<TParent>>>;

export type {
    ActorDataSchema,
    ActorDataSource,
    ActorInstances,
    ActorItemTypes,
    ActorModules,
    ActorSourceAFMBE,
    ActorType,
};
