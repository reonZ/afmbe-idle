import type { Character, Creature, Zombie } from "actor";
import type { ACTOR_TYPES } from ".";
import fields = foundry.data.fields;

type ActorType = (typeof ACTOR_TYPES)[number];

type ActorInstances = {
    character: Character;
    creature: Creature;
    zombie: Zombie;
};

type ActorDataSchema = {};

type ActorDataSource = fields.ModelPropsFromSchema<ActorDataSchema>;

type ActorSystem = {};

export type { ActorDataSchema, ActorDataSource, ActorInstances, ActorSystem, ActorType };
