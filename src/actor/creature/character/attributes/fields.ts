import { CREATURE_ATTRIBUTES } from "actor";
import * as R from "remeda";
import { CharacterAttributeSchema, CharacterAttributesSchema } from ".";
import fields = foundry.data.fields;

class CharacterAttributeField extends fields.SchemaField<CharacterAttributeSchema> {
    constructor() {
        super({
            base: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 0,
                min: 0,
            }),
            drawback: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 0,
                min: 0,
            }),
            improved: new fields.BooleanField(),
        });
    }
}

class CharacterAttributesField extends fields.SchemaField<CharacterAttributesSchema> {
    constructor() {
        super(R.fromKeys(CREATURE_ATTRIBUTES, () => new CharacterAttributeField()));
    }
}

export { CharacterAttributeField, CharacterAttributesField };
