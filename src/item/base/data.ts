import { ItemAFMBE, ItemDataSchema, ItemModules, ItemSystem } from ".";
import * as R from "remeda";

class ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends foundry.abstract.TypeDataModel<
    TParent,
    TSchema
> {
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
        const modules = (this.constructor as typeof ItemDataModel).modules as ItemModules<ItemAFMBE>;

        for (const [key, Cls] of R.entries(modules)) {
            // @ts-expect-error
            parent[key] = new Cls(parent);
        }
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends ItemSystem {}

export { ItemDataModel };
