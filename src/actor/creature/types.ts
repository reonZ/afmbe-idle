import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE, ActorDataSchema, ActorSystem, AdversarySource, CharacterSource, ZombieSource } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { CREATURE_ATTRIBUTES, CREATURE_SECONDARY_ATTRIBUTES, CreatureDataModel } from ".";

type CreatureAttribute = (typeof CREATURE_ATTRIBUTES)[number];
type CreatureSecondaryAttribute = (typeof CREATURE_SECONDARY_ATTRIBUTES)[number];

type CreatureDataSchema = ActorDataSchema & {
    endurance: PositiveIntergerValueField;
    essence: PositiveIntergerValueField;
    life: PositiveIntergerValueField;
};

type CreatureDataSource = ModelPropsFromSchema<CreatureDataSchema>;

type CreatureSystem<TParent extends Creature = Creature> = ActorSystem<TParent> & {
    attributes: Record<CreatureAttribute, number>;
    endurance: ValueAndMax;
    essence: ValueAndMax;
    life: ValueAndMax;
    speed: { value: number };
};

type CreatureSecondaryAttributes = Record<CreatureSecondaryAttribute, { value: number; max?: number }>;

declare abstract class Creature<
    TParent extends TokenDocument | null = TokenDocument | null,
> extends ActorAFMBE<TParent> {
    // attributes: CreatureAttributesModule;
    // endurance: CreatureEndurance;
    // essence: CreatureEssence;
    // life: CreatureLife;
    // speed: CreatureSpeed;
    system: CreatureDataModel;
}

type CreatureSource = AdversarySource | CharacterSource | ZombieSource;

export type {
    Creature,
    CreatureAttribute,
    CreatureDataSchema,
    CreatureDataSource,
    CreatureSecondaryAttribute,
    CreatureSecondaryAttributes,
    CreatureSource,
    CreatureSystem,
};
