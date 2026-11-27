import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { CreatureAFMBE } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { ItemAFMBE, ItemDataSchema, SubItems } from "item";
import type { SkillDataModel } from ".";

type SkillDataSchema = ItemDataSchema & {
    level: PositiveIntergerValueField;
};

type SkillDataSource = ModelPropsFromSchema<SkillDataSchema>;

declare class SkillAFMBE<TParent extends CreatureAFMBE | null = CreatureAFMBE | null> extends ItemAFMBE<TParent> {
    readonly _source: SkillSource;
    readonly parentItem: SkillAFMBE<TParent> | null;
    get rootParentItem(): SkillAFMBE<TParent> | null;
    readonly subItems: SubItems<SkillAFMBE<TParent>, SkillAFMBE<TParent>>;
    system: SkillDataModel;
}

type SkillSource = ItemSource<"skill", SkillDataSource>;

export type { SkillAFMBE, SkillDataSchema, SkillDataSource, SkillSource };
