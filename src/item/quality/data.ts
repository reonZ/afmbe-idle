import { ItemDataModel } from "item";
import { Quality, QualityDataSchema, QualitySystem } from ".";

class QualityDataModel<TParent extends Quality = Quality> extends ItemDataModel<TParent, QualityDataSchema> {
    static defineSchema(): QualityDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface QualityDataModel<TParent extends Quality = Quality> extends QualitySystem<TParent> {}

export { QualityDataModel };
