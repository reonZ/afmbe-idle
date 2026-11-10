import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { Armor, Physical, PhysicalSource, Quality, QualitySource, Skill, SkillSource, Weapon } from "item";
import type { ITEM_TYPES } from ".";

type ItemType = (typeof ITEM_TYPES)[number];

type ItemInstances = {
    armor: Armor;
    weapon: Weapon;
    physical: Physical;
    quality: Quality;
    skill: Skill;
};

type ItemDataSchema = {};

type ItemDataSource = ModelPropsFromSchema<ItemDataSchema>;

type ItemSystem = {};

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource;

export type { ItemDataSchema, ItemDataSource, ItemInstances, ItemSourceAFMBE, ItemSystem, ItemType };
