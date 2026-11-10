import { PositiveIntegerField } from ".";
import fields = foundry.data.fields;

class ValueField<T extends fields.DataField> extends fields.SchemaField<{ value: T }> {
    constructor(valueField: T) {
        super({ value: valueField });
    }
}

class PositiveIntergerValueField extends ValueField<PositiveIntegerField> {
    constructor() {
        super(new PositiveIntegerField());
    }
}

class ValueAndTotalField extends fields.SchemaField<{ total: PositiveIntegerField; value: PositiveIntegerField }> {
    constructor() {
        super({ total: new PositiveIntegerField(), value: new PositiveIntegerField() });
    }
}

export { PositiveIntergerValueField, ValueAndTotalField, ValueField };
