import { ActorAFMBE, ActorDataSchema, ActorDataSource } from ".";

class ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static defineSchema(): ActorDataSchema {
        return {};
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends ActorDataSource {}

export { ActorDataModel };
