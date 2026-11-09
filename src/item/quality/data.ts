import { ItemDataModel } from "item";
import { Quality, QualityDataSchema, QualityDataSource } from ".";

class QualityDataModel extends ItemDataModel<Quality, QualityDataSchema> {
    static defineSchema(): QualityDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface QualityDataModel extends QualityDataSource {}

export { QualityDataModel };
