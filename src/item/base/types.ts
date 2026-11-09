import type { Armor, Physical, PhysicalSource, Quality, QualitySource, Skill, SkillSource, Weapon } from "item";
import type { ITEM_TYPES } from ".";
import fields = foundry.data.fields;

type ItemType = (typeof ITEM_TYPES)[number];

type ItemInstances = {
    armor: Armor;
    weapon: Weapon;
    physical: Physical;
    quality: Quality;
    skill: Skill;
};

type ItemDataSchema = {};

type ItemDataSource = fields.ModelPropsFromSchema<ItemDataSchema>;

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource;

export type { ItemDataSchema, ItemDataSource, ItemInstances, ItemSourceAFMBE, ItemType };
