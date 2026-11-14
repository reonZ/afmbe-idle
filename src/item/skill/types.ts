import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ForeignDocumentField, ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { SkillDataModel } from ".";

type SkillDataSchema = ItemDataSchema & {
    level: PositiveIntergerValueField;
    parentSkill: ForeignDocumentField<string>;
};

type SkillDataSource = ModelPropsFromSchema<SkillDataSchema>;

declare class Skill<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    readonly _source: SkillSource;
    system: SkillDataModel;
}

type SkillSource = ItemSource<"skill", SkillDataSource>;

export type { Skill, SkillDataSchema, SkillDataSource, SkillSource };
