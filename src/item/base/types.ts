import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import { ActorAFMBE } from "actor";
import type { Armor, Physical, PhysicalSource, Quality, QualitySource, Skill, SkillSource, Weapon } from "item";
import type { ITEM_TYPES, ItemAFMBE } from ".";

type ItemType = (typeof ITEM_TYPES)[number];

type ItemInstances<TParent extends ActorAFMBE | null = ActorAFMBE | null> = {
    armor: Armor<TParent>;
    weapon: Weapon<TParent>;
    physical: Physical<TParent>;
    quality: Quality<TParent>;
    skill: Skill<TParent>;
};

type ItemDataSchema = {};

type ItemDataSource = ModelPropsFromSchema<ItemDataSchema>;

type ItemSystem<TParent extends ItemAFMBE = ItemAFMBE> = {};

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource;

export type { ItemDataSchema, ItemDataSource, ItemInstances, ItemSourceAFMBE, ItemSystem, ItemType };
