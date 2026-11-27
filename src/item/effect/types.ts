import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { PositiveIntergerValueField } from "fields";
import type { EffectDataModel, ItemAFMBE, ItemDataSchema } from "item";

type EffectDataSchema = ItemDataSchema & {
    level: PositiveIntergerValueField;
};

type EffectDataSource = ModelPropsFromSchema<EffectDataSchema>;

declare class Effect<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    readonly _source: EffectSource;
    system: EffectDataModel;
}

type EffectSource = ItemSource<"effect", EffectDataSource>;

export type { Effect, EffectDataSchema, EffectDataSource, EffectSource };
