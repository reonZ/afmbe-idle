import { CharacterExperienceSchema } from ".";
import fields = foundry.data.fields;

class CharacterExperienceField extends fields.SchemaField<CharacterExperienceSchema> {
    constructor() {
        super({
            current: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                min: 0,
                initial: 0,
            }),
            total: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                min: 0,
                initial: 0,
            }),
        });
    }
}

export { CharacterExperienceField };
