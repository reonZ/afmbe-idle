import type { ActorAFMBE, ActorDataSchema } from "actor";
import type { AdversarySource, CharacterSource, CREATURE_ATTRIBUTES, CreatureDataModel, ZombieSource } from ".";
import fields = foundry.data.fields;

type CreatureAttribute = (typeof CREATURE_ATTRIBUTES)[number];

type CreatureDataSchema = ActorDataSchema & {};

type CreatureDataSource = fields.ModelPropsFromSchema<CreatureDataSchema>;

interface Creature<TParent extends TokenDocument | null = TokenDocument | null> extends ActorAFMBE<TParent> {
    system: CreatureDataModel;
}

type CreatureSource = AdversarySource | CharacterSource | ZombieSource;

export type { Creature, CreatureAttribute, CreatureDataSchema, CreatureDataSource, CreatureSource };
