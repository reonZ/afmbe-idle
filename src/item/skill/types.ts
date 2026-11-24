import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { Creature } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { ItemAFMBE, ItemDataSchema, SubItems } from "item";
import type { SkillDataModel } from ".";

type SkillDataSchema = ItemDataSchema & {
    level: PositiveIntergerValueField;
};

type SkillDataSource = ModelPropsFromSchema<SkillDataSchema>;

declare class Skill<TParent extends Creature | null = Creature | null> extends ItemAFMBE<TParent> {
    readonly _source: SkillSource;
    readonly parentItem: Skill<TParent> | null;
    get rootParentItem(): Skill<TParent> | null;
    readonly subItems: SubItems<Skill<TParent>, Skill<TParent>>;
    system: SkillDataModel;
}

type SkillSource = ItemSource<"skill", SkillDataSource>;

export type { Skill, SkillDataSchema, SkillDataSource, SkillSource };
