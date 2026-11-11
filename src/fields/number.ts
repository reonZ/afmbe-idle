import fields = foundry.data.fields;

class PositiveIntegerField extends fields.NumberField<number, number, true, false, true> {
    constructor({ min = 0 }: { min?: number } = {}) {
        super({
            required: true,
            nullable: false,
            integer: true,
            min,
            initial: 0,
        });
    }
}

export { PositiveIntegerField };
