import { DocumentConstructionContext } from "@7h3laughingman/foundry-types/common/_types.mjs";
import type {
    ArrayField,
    ModelPropsFromSchema,
    SchemaField,
    SourceFromSchema,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ItemSchema } from "@7h3laughingman/foundry-types/common/documents/item.mjs";
import type { ActorAFMBE } from "actor";
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

type SubItemDataSchema = Omit<ItemSchema<ItemType>, "effects">;

type SubItemDataSource = SourceFromSchema<SubItemDataSchema>;

type ItemDataSchema = {
    subItems: ArrayField<SchemaField<SubItemDataSchema>>;
};

type SubItem<TParent extends ItemAFMBE, TSubItem extends ItemType> = ItemInstances<TParent["actor"]>[TSubItem];

type ItemDataSource = ModelPropsFromSchema<ItemDataSchema>;

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource;

interface ItemConstructionContext<TParent extends ActorAFMBE | null> extends DocumentConstructionContext<TParent> {
    parentItem?: ItemAFMBE<TParent>;
}

export type {
    ItemConstructionContext,
    ItemDataSchema,
    ItemDataSource,
    ItemInstances,
    ItemSourceAFMBE,
    ItemType,
    SubItem,
    SubItemDataSchema,
    SubItemDataSource,
};
