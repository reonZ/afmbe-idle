import type {
    ActorUUID,
    ItemSource,
    ItemUUID,
    TokenDocumentUUID,
} from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type {
    DocumentUUIDField,
    ModelPropsFromSchema,
    SchemaField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { EffectDataModel, ItemAFMBE, ItemDataSchema } from "item";

type EffectOriginSchema = {
    actor: DocumentUUIDField<ActorUUID>;
    item: DocumentUUIDField<ItemUUID>;
    token: DocumentUUIDField<TokenDocumentUUID>;
};

type EffectOriginSource = ModelPropsFromSchema<EffectOriginSchema>;

type EffectDataSchema = ItemDataSchema & {
    level: PositiveIntergerValueField;
    origin: SchemaField<EffectOriginSchema>;
};

type EffectDataSource = ModelPropsFromSchema<EffectDataSchema>;

declare class EffectAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    readonly _source: EffectSource;
    system: EffectDataModel;
}

type EffectSource = ItemSource<"effect", EffectDataSource>;

export type { EffectAFMBE, EffectDataSchema, EffectDataSource, EffectOriginSource, EffectSource };
