class BooleanField extends foundry.data.fields.BooleanField<boolean, boolean, true, false, true> {
    constructor() {
        super({
            required: true,
            nullable: false,
            initial: false,
        });
    }
}

export { BooleanField };
