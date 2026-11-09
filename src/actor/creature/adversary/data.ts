import { CreatureDataModel } from "actor";
import { Adversary, AdversaryDataSchema, AdversaryDataSource } from ".";

class AdversaryDataModel extends CreatureDataModel<Adversary, AdversaryDataSchema> {
    static defineSchema(): AdversaryDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface AdversaryDataModel extends AdversaryDataSource {}

export { AdversaryDataModel };
