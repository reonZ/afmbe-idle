import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type {
    ModelPropsFromSchema,
    SchemaField,
    StringField,
    TypedObjectField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { ItemAFMBE, ItemDataSchema, ItemSystem } from "item";
import type { SkillDataModel, Specialty } from ".";

type SkillSpecialtySchema = {
    level: PositiveIntergerValueField;
    name: StringField<string, string, true, false, false>;
    slug: StringField<string, string, true, false, false>;
};

type SkillSpecialtySource = ModelPropsFromSchema<SkillSpecialtySchema>;

type SkillDataSchema = ItemDataSchema & {
    level: PositiveIntergerValueField;
    specialties: TypedObjectField<SchemaField<SkillSpecialtySchema>>;
};

type SkillDataSource = ModelPropsFromSchema<SkillDataSchema>;

type SkillSystem<TParent extends Skill = Skill> = ItemSystem<TParent> & {
    level: { value: number };
    specialties: Record<string, Specialty<TParent>>;
};

declare class Skill<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: SkillDataModel;
}

type SkillSource = ItemSource<"skill", SkillDataSource>;

export type { Skill, SkillDataSchema, SkillDataSource, SkillSource, SkillSpecialtySource, SkillSystem };
