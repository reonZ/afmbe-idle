import { CreatureLifeSchema } from ".";
import fields = foundry.data.fields;

class CreatureLifeField extends fields.SchemaField<CreatureLifeSchema> {
    constructor() {
        super({
            value: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                min: 0,
                initial: 0,
            }),
        });
    }
}

export { CreatureLifeField };
