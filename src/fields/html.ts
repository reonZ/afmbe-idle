class RequiredHTMLField extends foundry.data.fields.HTMLField<string, string, true, false, true> {
    constructor() {
        super({
            required: true,
            nullable: false,
            initial: "",
        });
    }
}

export { RequiredHTMLField };
