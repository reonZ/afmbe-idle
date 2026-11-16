import { DocumentConstructionContext } from "@7h3laughingman/foundry-types/common/_types.mjs";
import { DatabaseCreateOperation } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
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

type SubItemDataSchema = Omit<ItemSchema<ItemType>, "effects" | "folder">;

type SubItemDataSource = ModelPropsFromSchema<SubItemDataSchema>;

type ItemDataSchema = {
    subItems: ArrayField<SchemaField<SubItemDataSchema>>;
};

type ItemCreateOperation<TParent extends ActorAFMBE | ItemAFMBE | null> = DatabaseCreateOperation<
    TParent extends ItemAFMBE ? null : TParent | null
>;

type SubItem<TParent extends ItemAFMBE, TSubItem extends ItemType> = ItemInstances<TParent["actor"]>[TSubItem];

type ItemDataSource = SourceFromSchema<ItemDataSchema>;

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource;

interface ItemConstructionContext<TParent extends ActorAFMBE | null> extends DocumentConstructionContext<TParent> {
    parentItem?: ItemAFMBE<TParent>;
}

export type {
    ItemConstructionContext,
    ItemCreateOperation,
    ItemDataSchema,
    ItemDataSource,
    ItemInstances,
    ItemSourceAFMBE,
    ItemType,
    SubItem,
    SubItemDataSchema,
    SubItemDataSource,
};
