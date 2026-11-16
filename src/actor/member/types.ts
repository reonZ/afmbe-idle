import type {
    HTMLField,
    ModelPropsFromSchema,
    SchemaField,
    SourceFromSchema,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/actor.mjs";
import type { Character, CreatureAttributeType, CharacterDataSchema } from "actor";
import type { BooleanField, PositiveIntegerField, ValueAndTotalField } from "fields";
import type { MEMBER_CATEGORY, MemberDataModel } from ".";

type MemberDetailsSchema = {
    description: HTMLField;
    personality: HTMLField;
    quote: HTMLField;
};

type MemberAttributeSchema = {
    base: PositiveIntegerField;
    drawback: PositiveIntegerField;
    improved: BooleanField;
};

type MemberAttributesSchema = Record<CreatureAttributeType, SchemaField<MemberAttributeSchema>>;

type MemberCategory = (typeof MEMBER_CATEGORY)[number];

type MemberDataSchema = CharacterDataSchema & {
    attributes: SchemaField<MemberAttributesSchema>;
    category: StringField<MemberCategory, MemberCategory, true, false, true>;
    details: SchemaField<MemberDetailsSchema>;
    experience: ValueAndTotalField;
};

type MemberAttributeSource = SourceFromSchema<MemberAttributeSchema>;
type MemberAttributesSource = SourceFromSchema<MemberAttributesSchema>;

type MemberDataSource = ModelPropsFromSchema<MemberDataSchema>;

declare class Member<TParent extends TokenDocument | null = TokenDocument | null> extends Character<TParent> {
    system: MemberDataModel;
}

type MemberSource = ActorSource<"member", MemberDataSource>;

export type {
    Member,
    MemberAttributeSource,
    MemberAttributesSource,
    MemberDataSchema,
    MemberDataSource,
    MemberSource,
    MemberCategory,
};
