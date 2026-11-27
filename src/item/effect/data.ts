import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import { EffectAFMBE, EffectDataSchema, EffectDataSource } from ".";

class EffectDataModel<TParent extends EffectAFMBE = EffectAFMBE> extends ItemDataModel<TParent, EffectDataSchema> {
    static defineSchema(): EffectDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
        };
    }
}

interface EffectDataModel<TParent extends EffectAFMBE = EffectAFMBE> extends Omit<
    EffectDataSource,
    keyof ItemDataSource
> {}

export { EffectDataModel };
