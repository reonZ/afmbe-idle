import fields = foundry.data.fields;

class PositiveIntegerField extends fields.NumberField<number, number, true, false, true> {
    constructor({ initial, min = 0 }: { initial?: number; min?: number } = {}) {
        super({
            required: true,
            nullable: false,
            integer: true,
            min,
            initial: initial ?? min,
        });
    }
}

export { PositiveIntegerField };
