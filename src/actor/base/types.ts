import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { AdversaryAFMBE, CharacterAFMBE, CreatureAFMBE, CreatureSource, MemberAFMBE, ZombieAFMBE } from "actor";
import type { ItemInstances, ItemType } from "item";
import type { TokenDocumentAFMBE } from "misc";
import type { ACTOR_TYPES, ActorAFMBE } from ".";

type ActorType = (typeof ACTOR_TYPES)[number];

type ActorInstances<TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null> = {
    adversary: AdversaryAFMBE<TParent>;
    character: CharacterAFMBE<TParent>;
    creature: CreatureAFMBE<TParent>;
    member: MemberAFMBE<TParent>;
    zombie: ZombieAFMBE<TParent>;
};

type ActorItemTypes<TParent extends ActorAFMBE = ActorAFMBE> = {
    [k in ItemType]: ItemInstances<TParent>[k][];
};

type ActorDataSchema = {};

type ActorDataSource = ModelPropsFromSchema<ActorDataSchema>;

type ActorSourceAFMBE = CreatureSource;

export type { ActorDataSchema, ActorDataSource, ActorInstances, ActorItemTypes, ActorSourceAFMBE, ActorType };
