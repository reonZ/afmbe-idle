import { CharacterDataModel, CharacterDataSource } from "actor";
import { Adversary, AdversaryDataSchema, AdversaryDataSource } from ".";

class AdversaryDataModel<TParent extends Adversary = Adversary> extends CharacterDataModel<
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
    keyof CharacterDataSource
> {}

export { AdversaryDataModel };
