import type {
    ModelPropsFromSchema,
    NumberField,
    SchemaField,
    SourceFromSchema,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ActorSource } from "@7h3laughingman/foundry-types/common/documents/_module.mjs";
import type { Character, CharacterDataSchema, CreatureAttributeType } from "actor";
import type { ValueField } from "fields";
import type { AdversaryDataModel } from ".";

type AdversaryAttributesSchema = Record<
    CreatureAttributeType,
    ValueField<NumberField<number, number, true, false, true>>
>;

type AdversaryAttributesSource = SourceFromSchema<AdversaryAttributesSchema>;

type AdversaryDataSchema = CharacterDataSchema & {
    attributes: SchemaField<AdversaryAttributesSchema>;
};

type AdversaryDataSource = ModelPropsFromSchema<AdversaryDataSchema>;

declare class Adversary<TParent extends TokenDocument | null = TokenDocument | null> extends Character<TParent> {
    system: AdversaryDataModel;
}

type AdversarySource = ActorSource<"adversary", AdversaryDataSource>;

export type { AdversaryAttributesSource, Adversary, AdversaryDataSchema, AdversaryDataSource, AdversarySource };
