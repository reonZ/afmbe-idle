import { ActorAFMBE, ActorDataSchema, ActorSystem } from ".";

class ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static defineSchema(): ActorDataSchema {
        return {};
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends ActorSystem {}

export { ActorDataModel };
