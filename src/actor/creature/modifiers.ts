import {
    CREATURE_ATTRIBUTES,
    CREATURE_MODIFIER_AFFECTS,
    CreatureModifierSchema,
    CreatureModifierTargetsSchema,
} from ".";
import fields = foundry.data.fields;

class CreatureModifiersField extends fields.ArrayField<fields.SchemaField<CreatureModifierSchema>> {
    static defineBaseSchema(): Pick<CreatureModifierSchema, "label" | "origin" | "value"> {
        return {
            label: new fields.StringField({
                required: true,
                nullable: false,
                blank: false,
            }),
            origin: new fields.DocumentUUIDField({
                embedded: true,
                type: "Item",
            }),
            value: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 1,
            }),
        };
    }

    static defineTargetSchema(): CreatureModifierTargetsSchema {
        return {
            attribute: new fields.StringField({
                required: false,
                nullable: true,
                blank: false,
                initial: undefined,
                choices: CREATURE_ATTRIBUTES,
            }),
            traits: new fields.ArrayField(
                new fields.StringField({
                    required: true,
                    nullable: false,
                    blank: false,
                }),
            ),
        };
    }

    constructor() {
        super(
            new fields.SchemaField({
                ...CreatureModifiersField.defineBaseSchema(),
                active: new fields.BooleanField(),
                affects: new fields.StringField({
                    required: true,
                    nullable: false,
                    initial: "all",
                    choices: CREATURE_MODIFIER_AFFECTS,
                }),
                targets: new fields.SchemaField(CreatureModifiersField.defineTargetSchema()),
            }),
        );
    }
}

export { CreatureModifiersField };
