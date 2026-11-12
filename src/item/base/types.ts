import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { Armor, Physical, PhysicalSource, Quality, QualitySource, Skill, SkillSource, Weapon } from "item";
import type { ITEM_TYPES, ItemAFMBE, ItemCollection, ItemModule } from ".";
import { ActorAFMBE } from "actor";

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

type ItemSystem = {};

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource;

type ItemCollections<TParent extends ItemAFMBE> = Partial<Record<keyof TParent, typeof ItemCollection<TParent, any>>>;
type ItemModules<TParent extends ItemAFMBE> = Partial<Record<keyof TParent, typeof ItemModule<TParent>>>;

export type {
    ItemCollections,
    ItemDataSchema,
    ItemDataSource,
    ItemInstances,
    ItemModules,
    ItemSourceAFMBE,
    ItemSystem,
    ItemType,
};
