import fields = foundry.data.fields;

class PositiveIntegerField extends fields.NumberField<number, number, true, false, true> {
    constructor() {
        super({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
        });
    }
}

export { PositiveIntegerField };
