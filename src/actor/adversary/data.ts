import { CharacterDataModel, CharacterDataSource, CREATURE_ATTRIBUTES } from "actor";
import { ValueField } from "fields";
import * as R from "remeda";
import { AdversaryAFMBE, AdversaryAttributes, AdversaryDataSchema, AdversaryDataSource } from ".";
import fields = foundry.data.fields;

class AdversaryDataModel<TParent extends AdversaryAFMBE = AdversaryAFMBE> extends CharacterDataModel<
    TParent,
    AdversaryDataSchema
> {
    static defineSchema(): AdversaryDataSchema {
        return {
            ...super.defineSchema(),
            attributes: new fields.SchemaField({
                ...R.fromKeys(CREATURE_ATTRIBUTES, () => {
                    return new ValueField(
                        new fields.NumberField<number, number, true, false, true>({
                            required: true,
                            nullable: false,
                            integer: true,
                            initial: 0,
                        }),
                    );
                }),
            }),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
        this.attributes = new AdversaryAttributes(this.parent);
    }
}

interface AdversaryDataModel<TParent extends AdversaryAFMBE = AdversaryAFMBE> extends Omit<
    AdversaryDataSource,
    keyof CharacterDataSource | "attributes"
> {}

export { AdversaryDataModel };
