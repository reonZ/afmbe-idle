import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type {
    ArrayField,
    DocumentIdField,
    ModelPropsFromSchema,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { PositiveIntegerField } from "fields";
import type { ItemAFMBE, ItemDataSchema, ItemSystem } from "item";
import type { SkillDataModel, SkillSpecialtiesModule } from ".";

type SkillSpecialtySchema = {
    id: DocumentIdField<string, true, false, true>;
    level: PositiveIntegerField;
    name: StringField<string, string, true, false, true>;
};

type SkillSpecialtySource = ModelPropsFromSchema<SkillSpecialtySchema>;

type SkillDataSchema = ItemDataSchema & {
    level: PositiveIntegerField;
    specialties: ArrayField<SchemaField<SkillSpecialtySchema>>;
};

type SkillDataSource = ModelPropsFromSchema<SkillDataSchema>;

type SkillSystem = ItemSystem & SkillDataSource;

declare class Skill<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    get bonus(): string;
    get level(): number;
    specialties: SkillSpecialtiesModule;
    system: SkillDataModel;
}

type SkillSource = ItemSource<"skill", SkillDataSource>;

export type { Skill, SkillDataSchema, SkillDataSource, SkillSource, SkillSpecialtySource, SkillSystem };
