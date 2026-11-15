import { DatabaseCreateOperation } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { ActorAFMBE } from "actor";
import { ITEM_PHYSICAL_TYPES } from "item";
import * as R from "remeda";
import {
    ItemConstructionContext,
    ItemDataModel,
    ItemDataSchema,
    ItemInstances,
    ItemSourceAFMBE,
    ItemType,
    SubItems,
} from ".";

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    declare parentItem: ItemAFMBE<TParent> | null;
    declare subItems: SubItems<ItemAFMBE<TParent>>;

    constructor(data: PreCreate<ItemSourceAFMBE>, context: ItemConstructionContext<TParent> = {}) {
        super(data, context);
        this.parentItem = context.parentItem ?? null;
    }

    static override async createDocuments<TDocument extends foundry.abstract.Document>(
        this: ConstructorOf<TDocument>,
        data?: (TDocument | DeepPartial<TDocument["_source"]>)[],
        operation?: Partial<DatabaseCreateOperation<TDocument["parent"]>>,
    ): Promise<TDocument[]>;
    static override async createDocuments(
        data: (ItemAFMBE | PreCreate<ItemSourceAFMBE>)[] = [],
        operation: Partial<DatabaseCreateOperation<ActorAFMBE | null>> = {},
    ): Promise<Item[]> {
        const sources = data.map((itemOrSource) => {
            return itemOrSource instanceof ItemAFMBE ? itemOrSource.toObject() : itemOrSource;
        });

        // we prevent the creation of non-allowed actor items
        if (operation.parent) {
            const allowedItems = operation.parent.system.allowedItems;
            const validSources = R.filter(sources, (source) => R.isIncludedIn(source.type, allowedItems));
            return super.createDocuments(validSources, operation);
        }

        return super.createDocuments(sources, operation);
    }

    get uuid(): foundry.documents.ItemUUID {
        return this.parentItem ? `${this.parentItem.uuid}.Item.${this.id}` : super.uuid;
    }

    _initialize(options?: Record<string, unknown>): void {
        this.subItems ??= new SubItems();
        super._initialize(options);
    }

    override getEmbeddedDocument(
        embeddedName: string,
        id: string,
        options: { strict: true },
    ): foundry.abstract.Document;
    override getEmbeddedDocument(
        embeddedName: string,
        id: string,
        options?: { strict?: boolean },
    ): foundry.abstract.Document | undefined;
    getEmbeddedDocument(embeddedName: string, id: string, options?: { strict?: boolean }) {
        return embeddedName === "Item"
            ? this.subItems.get(id, options)
            : super.getEmbeddedDocument(embeddedName, id, options);
    }

    isOfType<T extends ItemType | "physical">(type: T): this is ItemInstances<this["parent"]>[T] {
        return type === "physical" ? R.isIncludedIn(this.type, ITEM_PHYSICAL_TYPES) : this.type === type;
    }

    prepareEmbeddedDocuments(): void {
        super.prepareEmbeddedDocuments();

        const allowedSubItems = this.system.allowedSubItems;

        for (const data of this.system.subItems) {
            if (!R.isIncludedIn(data.type, allowedSubItems)) continue;

            try {
                const source = foundry.utils.deepClone(data);
                const item = new Item.implementation(source, { parent: this.actor, parentItem: this });
                this.subItems.set(item.id, item as ItemAFMBE<TParent>);
            } catch (err: any) {
                console.error(`[System] an error occured while instantiating a sub-item in ${this.uuid}`, err);
            }
        }
    }
}

interface ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> {
    readonly _source: ItemSourceAFMBE;
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
