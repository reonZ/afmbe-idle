import { ItemDataModel, ItemDataSource } from "item";
import { Quality, QualityDataSchema, QualityDataSource } from ".";

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

interface QualityDataModel<TParent extends Quality = Quality> extends Omit<QualityDataSource, keyof ItemDataSource> {}

export { QualityDataModel };
