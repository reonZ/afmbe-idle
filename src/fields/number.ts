import fields = foundry.data.fields;

class PositiveIntegerField<T extends number = number> extends fields.NumberField<T, T, true, false, true> {
    constructor({ max, min = 0 as T }: { max?: T; min?: T } = {}) {
        super({
            required: true,
            nullable: false,
            integer: true,
            max,
            min,
            initial: min,
        });
    }
}

export { PositiveIntegerField };
