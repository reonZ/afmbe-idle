import { CreatureDataModel, CreatureDataSource } from "actor";
import { Adversary, AdversaryDataSchema, AdversaryDataSource } from ".";

class AdversaryDataModel<TParent extends Adversary = Adversary> extends CreatureDataModel<
    TParent,
    AdversaryDataSchema
> {
    static defineSchema(): AdversaryDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface AdversaryDataModel<TParent extends Adversary = Adversary> extends Omit<
    AdversaryDataSource,
    keyof CreatureDataSource
> {}

export { AdversaryDataModel };
