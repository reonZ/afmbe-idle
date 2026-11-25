import type {
    ModelPropsFromSchema,
    SchemaField,
    SourceFromSchema,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/actor.mjs";
import type { Character, CharacterDataSchema, CreatureAttributeType } from "actor";
import type { BooleanField, PositiveIntegerField, RequiredHTMLField } from "fields";
import type { TokenDocumentAFMBE } from "misc";
import type { MEMBER_CATEGORY, MemberDataModel } from ".";

type MemberDetailsSchema = {
    description: RequiredHTMLField;
    personality: RequiredHTMLField;
    quote: RequiredHTMLField;
};

type MemberAttributeSchema = {
    base: PositiveIntegerField;
    drawback: PositiveIntegerField;
    improved: BooleanField;
};

type MemberAttributesSchema = Record<CreatureAttributeType, SchemaField<MemberAttributeSchema>>;

type MemberCategory = (typeof MEMBER_CATEGORY)[number];

type MemberExperienceSchema = {
    total: PositiveIntegerField;
    value: PositiveIntegerField;
};

type MemberDataSchema = Omit<CharacterDataSchema, "attributes"> & {
    attributes: SchemaField<MemberAttributesSchema>;
    category: StringField<MemberCategory, MemberCategory, true, false, true>;
    details: SchemaField<MemberDetailsSchema>;
    experience: SchemaField<MemberExperienceSchema>;
};

type MemberAttributeSource = SourceFromSchema<MemberAttributeSchema>;
type MemberAttributesSource = SourceFromSchema<MemberAttributesSchema>;

type MemberDataSource = ModelPropsFromSchema<MemberDataSchema>;

declare class Member<TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null> extends Character<TParent> {
    system: MemberDataModel;
}

type MemberSource = ActorSource<"member", MemberDataSource>;

export type {
    Member,
    MemberAttributeSource,
    MemberAttributesSource,
    MemberCategory,
    MemberDataSchema,
    MemberDataSource,
    MemberSource,
};
