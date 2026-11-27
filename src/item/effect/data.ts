import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import { Effect, EffectDataSchema, EffectDataSource } from ".";

class EffectDataModel<TParent extends Effect = Effect> extends ItemDataModel<TParent, EffectDataSchema> {
    static defineSchema(): EffectDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
        };
    }
}

interface EffectDataModel<TParent extends Effect = Effect> extends Omit<EffectDataSource, keyof ItemDataSource> {}

export { EffectDataModel };
