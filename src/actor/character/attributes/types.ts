import { CharacterAttributeField, CreatureAttribute } from "actor";
import fields = foundry.data.fields;

type CharacterAttributeSchema = {
    base: fields.NumberField<number, number, true, false, true>;
    drawback: fields.NumberField<number, number, true, false, true>;
    improved: fields.BooleanField;
};

type CharacterAttributeSource = fields.SourceFromSchema<CharacterAttributeSchema>;

type CharacterAttributesSchema = Record<CreatureAttribute, CharacterAttributeField>;

type CharacterAttributesSource = fields.ModelPropsFromSchema<CharacterAttributesSchema>;

export type {
    CharacterAttributeSchema,
    CharacterAttributeSource,
    CharacterAttributesSchema,
    CharacterAttributesSource,
};
