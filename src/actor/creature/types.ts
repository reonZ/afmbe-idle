import type { ActorAFMBE, ActorDataSchema } from "actor";
import type {
    AdversarySource,
    CharacterSource,
    CREATURE_ATTRIBUTES,
    CREATURE_SECONDARY_ATTRIBUTES,
    CreatureDataModel,
    CreatureLife,
    CreatureLifeField,
    ZombieSource,
} from ".";
import fields = foundry.data.fields;

type CreatureAttribute = (typeof CREATURE_ATTRIBUTES)[number];
type CreatureSecondaryAttribute = (typeof CREATURE_SECONDARY_ATTRIBUTES)[number];

type CreatureDataSchema = ActorDataSchema & {
    life: CreatureLifeField;
};

type CreatureDataSource = fields.ModelPropsFromSchema<CreatureDataSchema>;

type CreatureSystem = {
    life: { value: number; total: number };
};

type CreatureAttributes = Record<CreatureAttribute, number>;
type CreatureSecondaryAttributes = Record<CreatureSecondaryAttribute, { value: number; max?: number }>;

declare abstract class Creature<
    TParent extends TokenDocument | null = TokenDocument | null,
> extends ActorAFMBE<TParent> {
    abstract attributes: Record<CreatureAttribute, number>;
    life: CreatureLife<this>;
    system: CreatureDataModel;
}

type CreatureSource = AdversarySource | CharacterSource | ZombieSource;

export type {
    Creature,
    CreatureAttribute,
    CreatureAttributes,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureSecondaryAttribute,
    CreatureSecondaryAttributes,
    CreatureSource,
    CreatureSystem,
};
