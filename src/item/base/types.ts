import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type {
    Armor,
    Physical,
    PhysicalSource,
    Quality,
    QualitySource,
    Skill,
    SkillSource,
    Specialty,
    SpecialtySource,
    Weapon,
} from "item";
import type { ITEM_TYPES } from ".";

type ItemType = (typeof ITEM_TYPES)[number];

type ItemInstances<TParent extends ActorAFMBE | null = ActorAFMBE | null> = {
    armor: Armor<TParent>;
    weapon: Weapon<TParent>;
    physical: Physical<TParent>;
    quality: Quality<TParent>;
    skill: Skill<TParent>;
    specialty: Specialty<TParent>;
};

type ItemDataSchema = {};

type ItemDataSource = ModelPropsFromSchema<ItemDataSchema>;

type ItemSourceAFMBE = PhysicalSource | QualitySource | SkillSource | SpecialtySource;

export type { ItemDataSchema, ItemDataSource, ItemInstances, ItemSourceAFMBE, ItemType };
