import { ItemType } from "item";
import * as R from "remeda";
import { ActorAFMBE, ActorDataSchema, ActorDataSource, ActorModules } from ".";

class ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static modules = {} satisfies ActorModules<ActorAFMBE>;

    static defineSchema(): ActorDataSchema {
        return {};
    }

    get allowedItems(): ItemType[] {
        return [];
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();

        const parent = this.parent;
        const modules = (this.constructor as typeof ActorDataModel).modules as ActorModules<ActorAFMBE>;

        for (const [key, Cls] of R.entries(modules)) {
            // @ts-expect-error
            parent[key] = new Cls(parent);
        }
    }
}

interface ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends ActorDataSource {}

export { ActorDataModel };
