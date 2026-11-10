import { CreatureDataModel } from "actor";
import { Adversary, AdversaryDataSchema, AdversarySystem } from ".";

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

interface AdversaryDataModel extends AdversarySystem {}

export { AdversaryDataModel };
