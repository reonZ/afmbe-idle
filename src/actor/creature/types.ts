import type { ActorAFMBE, ActorDataSchema } from "actor";
import type { CREATURE_ATTRIBUTES, CreatureDataModel } from ".";
import fields = foundry.data.fields;

type CreatureAttribute = (typeof CREATURE_ATTRIBUTES)[number];

type CreatureDataSchema = ActorDataSchema & {};

type CreatureDataSource = fields.ModelPropsFromSchema<CreatureDataSchema>;

interface Creature<TParent extends TokenDocument | null = TokenDocument | null> extends ActorAFMBE<TParent> {
    system: CreatureDataModel;
}

export type { Creature, CreatureAttribute, CreatureDataSchema, CreatureDataSource };
