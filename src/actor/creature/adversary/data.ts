import { CreatureDataModel } from "actor";
import { Adversary, AdversaryDataSchema, AdversarySystem } from ".";

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

interface AdversaryDataModel<TParent extends Adversary = Adversary> extends AdversarySystem<TParent> {}

export { AdversaryDataModel };
