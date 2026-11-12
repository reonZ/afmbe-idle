import { ItemAFMBE, ItemCollections, ItemDataSchema, ItemModules, ItemSystem } from ".";
import * as R from "remeda";

class ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends foundry.abstract.TypeDataModel<
    TParent,
    TSchema
> {
    static collections = {} satisfies ItemCollections<ItemAFMBE>;
    static modules = {} satisfies ItemModules<ItemAFMBE>;

    static defineSchema(): ItemDataSchema {
        return {};
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();

        const parent = this.parent;
        const collections = (this.constructor as typeof ItemDataModel).collections as ItemCollections<ItemAFMBE>;
        const modules = (this.constructor as typeof ItemDataModel).modules as ItemModules<ItemAFMBE>;

        for (const [key, Cls] of R.entries(collections)) {
            // @ts-expect-error
            const instance = (parent[key] = new Cls(parent)) as ItemCollection<ItemAFMBE>;
            instance._initialize();
        }

        for (const [key, Cls] of R.entries(modules)) {
            // @ts-expect-error
            parent[key] = new Cls(parent);
        }
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends ItemSystem {}

export { ItemDataModel };
