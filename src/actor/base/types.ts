import type { Adversary, Character, Creature, CreatureSource, Zombie } from "actor";
import type { ACTOR_TYPES } from ".";
import fields = foundry.data.fields;

type ActorType = (typeof ACTOR_TYPES)[number];

type ActorInstances = {
    adversary: Adversary;
    character: Character;
    creature: Creature;
    zombie: Zombie;
};

type ActorDataSchema = {};

type ActorDataSource = fields.ModelPropsFromSchema<ActorDataSchema>;

type ActorSourceAFMBE = CreatureSource;

export type { ActorDataSchema, ActorDataSource, ActorInstances, ActorSourceAFMBE, ActorType };
