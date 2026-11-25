import { PositiveIntegerField } from ".";
import fields = foundry.data.fields;

class ValueField<T extends fields.DataField> extends fields.SchemaField<{ value: T }> {
    constructor(valueField: T) {
        super({ value: valueField });
    }
}

class PositiveIntergerValueField extends ValueField<PositiveIntegerField> {
    constructor(options: { min?: number } = {}) {
        super(new PositiveIntegerField(options));
    }
}

export { PositiveIntergerValueField, ValueField };
