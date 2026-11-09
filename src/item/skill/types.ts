import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { SkillDataModel } from ".";
import fields = foundry.data.fields;

type SkillDataSchema = ItemDataSchema & {};

type SkillDataSource = fields.ModelPropsFromSchema<SkillDataSchema>;

interface Skill<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: SkillDataModel;
}

export type { Skill, SkillDataSchema, SkillDataSource };
