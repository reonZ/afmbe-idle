import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema, ItemSystem } from "item";
import type { SkillDataModel } from ".";

type SkillDataSchema = ItemDataSchema & {};

type SkillDataSource = ModelPropsFromSchema<SkillDataSchema>;

type SkillSystem = ItemSystem;

declare class Skill<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: SkillDataModel;
}

type SkillSource = ItemSource<"skill", SkillDataSource>;

export type { Skill, SkillDataSchema, SkillDataSource, SkillSource, SkillSystem };
