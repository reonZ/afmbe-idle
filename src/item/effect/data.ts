import { PositiveIntergerValueField } from "fields";
import { ItemAFMBE, ItemDataModel, ItemDataSource } from "item";
import { EffectAFMBE, EffectDataSchema, EffectDataSource } from ".";
import fields = foundry.data.fields;
import { ActorAFMBE } from "actor";
import { TokenDocumentAFMBE } from "misc";
import { getDocumentFromUUIDSync } from "utils";

class EffectDataModel<TParent extends EffectAFMBE = EffectAFMBE> extends ItemDataModel<TParent, EffectDataSchema> {
    static defineSchema(): EffectDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({
                min: 1,
            }),
            origin: new fields.SchemaField({
                actor: new fields.DocumentUUIDField({
                    type: "Actor",
                }),
                item: new fields.DocumentUUIDField({
                    type: "Item",
                }),
                token: new fields.DocumentUUIDField({
                    embedded: true,
                    type: "Token",
                }),
            }),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        const source = this as EffectDataSource;

        this.origin = {
            actor: getDocumentFromUUIDSync("Actor", source.origin.actor),
            item: getDocumentFromUUIDSync("Item", source.origin.item),
            token: getDocumentFromUUIDSync("Token", source.origin.token),
        };
    }
}

interface EffectDataModel<TParent extends EffectAFMBE = EffectAFMBE> extends Omit<
    EffectDataSource,
    keyof ItemDataSource | "origin"
> {
    origin: {
        actor: ActorAFMBE | null;
        item: ItemAFMBE | null;
        token: TokenDocumentAFMBE | null;
    };
}

export { EffectDataModel };
