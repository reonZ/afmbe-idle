import { CollectionGetOptions } from "@7h3laughingman/foundry-types/common/utils/collection.mjs";
import * as R from "remeda";
import type { ItemAFMBE } from ".";

class SubItems<V extends ItemAFMBE = ItemAFMBE, TParent extends ItemAFMBE = ItemAFMBE> extends Collection<string, V> {
    #parent: TParent;

    constructor(parent: TParent) {
        super();
        this.#parent = parent;
    }

    get parent(): TParent {
        return this.#parent;
    }

    get<T extends ItemAFMBE<V["parent"]> = V>(key: Maybe<string | string[]>, options: { strict: true }): T;
    get<T extends ItemAFMBE<V["parent"]> = V>(key: string | string[], options?: CollectionGetOptions): T | undefined;
    get(id: Maybe<string | string[]>, options?: CollectionGetOptions) {
        const [itemId, ...subId] = R.isString(id) ? R.split(id, ".") : R.isArray(id) ? id : [id ?? ""];
        const item = itemId === this.parent.id ? this.parent : super.get(itemId, options);
        return subId.length ? item?.subItems.get(subId, options) : item;
    }
}

export { SubItems };
