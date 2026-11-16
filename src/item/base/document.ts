import {
    DatabaseCreateOperation,
    DatabaseDeleteOperation,
    DatabaseUpdateOperation,
    DataSchema,
} from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
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
    SubItemDataSource,
    SubItems,
} from ".";
import Document = foundry.abstract.Document;

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    declare parentItem: ItemAFMBE<TParent> | null;
    declare subItems: SubItems<ItemAFMBE<TParent>>;

    constructor(data: PreCreate<ItemSourceAFMBE>, context: ItemConstructionContext<TParent> = {}) {
        super(data, context);
        this.parentItem = context.parentItem ?? null;
    }

    static async createDocuments<TDocument extends Document>(
        this: ConstructorOf<TDocument>,
        data?: (TDocument | DeepPartial<TDocument["_source"]>)[],
        operation?: Partial<DatabaseCreateOperation<TDocument["parent"]>>,
    ): Promise<TDocument[]>;
    static async createDocuments(
        data: (ItemAFMBE | PreCreate<ItemSourceAFMBE>)[] = [],
        operation: Partial<DatabaseCreateOperation<ActorAFMBE | ItemAFMBE | null>> = {},
    ): Promise<Item[]> {
        const parent = operation.parent;
        const sources = data.map((itemOrSource) => {
            return itemOrSource instanceof ItemAFMBE ? itemOrSource.toObject() : itemOrSource;
        });

        // check if this actor allows that kind of items
        if (parent instanceof ActorAFMBE) {
            const allowedItems = parent.system.allowedItems;
            const validSources = R.filter(sources, (source) => R.isIncludedIn(source.type, allowedItems));
            return super.createDocuments(validSources, operation as DatabaseCreateOperation<ActorAFMBE>);
        }

        // forward the creation to parent for subitems
        if (parent instanceof ItemAFMBE) {
            const allowedItems = parent.system.allowedSubItems;
            const subItems = parent._source.system.subItems.slice();
            const sources = R.pipe(
                data,
                R.filter((entry): entry is ItemAFMBE | ItemSourceAFMBE => {
                    return "type" in entry && R.isIncludedIn(entry.type, allowedItems);
                }),
                R.map((entry): WithNonNullable<SubItemDataSource, "_id"> => {
                    const source = entry instanceof Item ? entry.toObject() : entry;
                    source._id ??= foundry.utils.randomID();
                    const item = new ItemAFMBE(source);
                    return item.toObject() as WithNonNullable<SubItemDataSource, "_id">;
                }),
            );

            if (sources.length === 0) return [];

            subItems.push(...sources);

            const returnedParent = await parent.update({ "system.subItems": subItems });
            if (!returnedParent) return [];

            const ids = R.map(sources, (source) => source._id);
            return returnedParent.subItems.filter(({ id }) => {
                return R.isIncludedIn(id, ids);
            });
        }

        return super.createDocuments(sources, operation as DatabaseCreateOperation<ActorAFMBE | null>);
    }

    static async updateDocuments<TDocument extends Document>(
        this: ConstructorOf<TDocument>,
        updates?: Record<string, unknown>[],
        operation?: Partial<DatabaseUpdateOperation<ActorAFMBE | ItemAFMBE | null>>,
    ): Promise<TDocument[]>;
    static async updateDocuments(
        updates: Record<string, unknown>[] = [],
        operation: Partial<DatabaseUpdateOperation<ActorAFMBE | ItemAFMBE | null>> = {},
    ): Promise<Item[]> {
        const parent = operation.parent;

        // forward the update to parent for subitems
        if (parent instanceof ItemAFMBE) {
            const changes = R.pipe(
                updates,
                R.filter((update): update is ItemSourceAFMBE & { _id: string } => R.isString(update._id)),
                R.indexBy(R.prop("_id")),
            );

            const subItems = R.map(parent.subItems.contents, (item): ItemSourceAFMBE => {
                const source = item._source;
                const update = changes[item.id];

                return update
                    ? foundry.utils.mergeObject(source, update, { inplace: false, applyOperators: true })
                    : source;
            });

            const returnedParent = await parent.update({ "system.subItems": subItems });
            return returnedParent?.subItems.filter(({ id }) => id in changes) ?? [];
        }

        return super.updateDocuments(updates, operation as DatabaseUpdateOperation<ActorAFMBE | null>);
    }

    static async deleteDocuments<TDocument extends Document>(
        this: ConstructorOf<TDocument>,
        ids?: string[],
        operation?: Partial<DatabaseDeleteOperation<ActorAFMBE | ItemAFMBE | null>>,
    ): Promise<TDocument[]>;
    static async deleteDocuments(
        ids: string[] = [],
        operation: Partial<DatabaseDeleteOperation<ActorAFMBE | ItemAFMBE | null>> = {},
    ): Promise<Item[]> {
        const parent = operation.parent;

        // forward the deletion to parent for subitems
        if (parent instanceof ItemAFMBE) {
            const removed = parent.subItems.filter((item) => R.isIncludedIn(item.id, ids));
            if (removed.length === 0) return [];

            const subItems = R.pipe(
                parent.subItems.contents,
                R.filter((item) => !R.isIncludedIn(item.id, ids)),
                R.map((item) => item._source),
            );

            await parent.update({ "system.subItems": subItems });

            return removed;
        }

        return super.deleteDocuments(ids, operation as DatabaseDeleteOperation<ActorAFMBE | null>);
    }

    get chainId(): string {
        return this.parentItemChain.concat(this).join(".");
    }

    get parentItemChain(): ItemAFMBE<TParent>[] {
        return this.parentItem ? this.parentItem.parentItemChain.concat(this.parentItem) : [];
    }

    get rootParentItem(): ItemAFMBE<TParent> | null {
        return this.parentItem?.rootParentItem ?? this.parentItem;
    }

    // generate uuid that chain with parent items
    get uuid(): foundry.documents.ItemUUID {
        return this.parentItem ? `${this.parentItem.uuid}.Item.${this.id}` : super.uuid;
    }

    _initialize(options?: Record<string, unknown>): void {
        this.subItems ??= new SubItems();
        super._initialize(options);
    }

    getEmbeddedDocument(embeddedName: string, id: string, options: { strict: true }): Document;
    getEmbeddedDocument(embeddedName: string, id: string, options?: { strict?: boolean }): Document | undefined;
    getEmbeddedDocument(embeddedName: string, id: string, options?: { strict?: boolean }) {
        return embeddedName === "Item"
            ? this.subItems.get(id, options)
            : super.getEmbeddedDocument(embeddedName, id, options);
    }

    createEmbeddedDocuments(
        embeddedName: string,
        data: object[],
        operation: Partial<DatabaseCreateOperation<this>> = {},
    ): Promise<Document[]> {
        if (embeddedName === "Item") {
            operation.parent = this;
            operation.pack = this.pack;
            return ItemAFMBE.createDocuments(data, operation);
        }
        return super.createEmbeddedDocuments(embeddedName, data, operation);
    }

    updateEmbeddedDocuments(
        embeddedName: string,
        updateData: EmbeddedDocumentUpdateData[],
        operation: Partial<DatabaseUpdateOperation<this>> = {},
    ): Promise<Document<Document>[]> {
        if (embeddedName === "Item") {
            operation.parent = this;
            operation.pack = this.pack;
            return ItemAFMBE.updateDocuments(updateData, operation) as any;
        }
        return super.updateEmbeddedDocuments(embeddedName, updateData, operation);
    }

    deleteEmbeddedDocuments(
        embeddedName: string,
        dataId: string[],
        operation: Partial<DatabaseDeleteOperation<this>> = {},
    ): Promise<Document<this, DataSchema>[]> {
        if (embeddedName === "Item") {
            operation.parent = this;
            operation.pack = this.pack;
            return ItemAFMBE.deleteDocuments(dataId, operation) as any;
        }
        return super.deleteEmbeddedDocuments(embeddedName, dataId, operation);
    }

    isOfType<T extends ItemType | "physical">(type: T): this is ItemInstances<this["parent"]>[T] {
        return type === "physical" ? R.isIncludedIn(this.type, ITEM_PHYSICAL_TYPES) : this.type === type;
    }

    prepareEmbeddedDocuments(): void {
        super.prepareEmbeddedDocuments();

        const allowedSubItems = this.system.allowedSubItems;

        this.subItems.clear();

        for (const data of this.system.subItems) {
            if (!R.isIncludedIn(data.type, allowedSubItems)) continue;

            try {
                const source = foundry.utils.deepClone(data);
                const item = new ItemAFMBE(source, { parent: this.actor, parentItem: this });
                this.subItems.set(item.id, item as ItemAFMBE<TParent>);
            } catch (err: any) {
                console.error(`[System] an error occured while instantiating a sub-item in ${this.uuid}`, err);
            }
        }
    }

    async update(
        data: Record<string, unknown> = {},
        operation: Partial<DatabaseUpdateOperation<ActorAFMBE | ItemAFMBE | null>> = {},
    ): Promise<this | undefined> {
        if (this.parentItem) {
            data._id = this.id;
            operation.parent = this.parentItem;
            operation.pack = this.parentItem.pack;
            const updated = await (this.constructor as typeof ItemAFMBE).updateDocuments([data], operation);
            return updated.shift() as this;
        }
        return super.update(data, operation);
    }

    async delete(
        operation: Partial<DatabaseDeleteOperation<ActorAFMBE | ItemAFMBE | null>> = {},
    ): Promise<this | undefined> {
        if (this.parentItem) {
            operation.parent = this.parentItem;
            operation.pack = this.parentItem.pack;
            const deleted = await (this.constructor as typeof ItemAFMBE).deleteDocuments([this.id], operation);
            return deleted.shift() as this;
        }
        return super.delete(operation);
    }
}

interface ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> {
    readonly _source: ItemSourceAFMBE;
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
