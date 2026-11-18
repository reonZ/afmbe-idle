import EmbeddedCollection, {
    EmbeddedCollectionGetOptions,
} from "@7h3laughingman/foundry-types/common/abstract/embedded-collection.mjs";
import { ImageFilePath, VideoFilePath } from "@7h3laughingman/foundry-types/common/constants.mjs";
import { ACTOR_CREATURE_TYPES } from "actor";
import { ItemAFMBE, ItemSourceAFMBE } from "item";
import type { TokenDocumentAFMBE } from "misc";
import * as R from "remeda";
import {
    ACTOR_CHARACTER_TYPES,
    ActorDataModel,
    ActorDataSchema,
    ActorInstances,
    ActorItemTypes,
    ActorSourceAFMBE,
    ActorType,
} from ".";
import { DatabaseCreateOperation } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";

class ActorAFMBE<TParent extends TokenDocumentAFMBE | null = TokenDocumentAFMBE | null> extends Actor<TParent> {
    static DEFAULT_ICONS: Partial<Record<ActorType, ImageFilePath>> = {};

    static getDefaultArtwork(actorData: ActorSourceAFMBE): {
        img: ImageFilePath;
        texture: { src: ImageFilePath | VideoFilePath };
    } {
        const defaultIcon = this.DEFAULT_ICONS[actorData.type] ?? this.DEFAULT_ICON;

        return {
            img: defaultIcon,
            texture: { src: defaultIcon },
        };
    }

    get defaultArtwork(): {
        img: ImageFilePath;
        texture: { src: ImageFilePath | VideoFilePath };
    } {
        return ActorAFMBE.getDefaultArtwork(this._source);
    }

    _initialize(options?: Record<string, unknown>): void {
        super._initialize(options);

        const getDescriptor = Reflect.getOwnPropertyDescriptor(this.items, "get");
        if (getDescriptor && !getDescriptor.writable) return; // we already overridden it

        const getItem = this.items.get.bind(this.items);
        Object.defineProperty(this.items, "get", {
            value: function (key: string, options?: EmbeddedCollectionGetOptions) {
                const [itemId, ...subId] = R.split(key, ".");
                const item = getItem(itemId, options);
                return subId.length ? item?.subItems.get(subId, options) : item;
            },
            enumerable: false,
        });
    }

    isOfType<T extends ActorType | "character" | "creature">(type: T): this is ActorInstances<this["parent"]>[T] {
        return type === "creature"
            ? R.isIncludedIn(this.type, ACTOR_CREATURE_TYPES)
            : type === "character"
              ? R.isIncludedIn(this.type, ACTOR_CHARACTER_TYPES)
              : this.type === type;
    }
}

interface ActorAFMBE {
    readonly _source: ActorSourceAFMBE;
    readonly items: EmbeddedCollection<ItemAFMBE<this>>;
    get itemTypes(): ActorItemTypes<this>;
    system: ActorDataModel<ActorAFMBE, ActorDataSchema>;
    readonly type: ActorType;

    createEmbeddedDocuments(
        embeddedName: "Item",
        data: PreCreate<ItemSourceAFMBE>[],
        operation?: Partial<DatabaseCreateOperation<this>>,
    ): Promise<ItemAFMBE<this>[]>;
}

export { ActorAFMBE };
