import { Quality, Skill } from "item";
import { ITEM_TYPES } from ".";
import fields = foundry.data.fields;

type ItemType = (typeof ITEM_TYPES)[number];

type ItemInstances = {
    quality: Quality;
    skill: Skill;
};

type ItemDataSchema = {};

type ItemDataSource = fields.ModelPropsFromSchema<ItemDataSchema>;

export type { ItemDataSchema, ItemDataSource, ItemInstances, ItemType };
