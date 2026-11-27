import { ActiveEffectChangeData } from "@7h3laughingman/foundry-types/client/documents/_types.mjs";
import { ActiveEffectSource } from "@7h3laughingman/foundry-types/common/documents/active-effect.mjs";
import { ActorAFMBE, CreatureModifier } from "actor";
import { ItemAFMBE } from "item";
import { TokenDocumentAFMBE } from "misc";

class ActiveEffectAFMBE<TParent extends ActorAFMBE | ItemAFMBE | null = ActorAFMBE | ItemAFMBE | null> extends foundry
    .documents.ActiveEffect<TParent> {
    static applyChange(
        targetDoc: ActorAFMBE | ItemAFMBE | TokenDocumentAFMBE,
        change: ActiveEffectChangeData,
        options: { replacementData?: Record<string, any>; modifyTarget?: boolean } = {},
    ): Record<string, unknown> {
        const actor = targetDoc instanceof ActorAFMBE ? targetDoc : targetDoc.actor;
        const item = targetDoc instanceof ItemAFMBE ? targetDoc : null;
        const token = targetDoc instanceof TokenDocumentAFMBE ? targetDoc : (actor?.token ?? null);
        const origin = item?.isOfType("effect") ? item.system.origin : null;

        // we use @actor, @item, @origin and @token replacement data instead of just the target's
        options.replacementData = { actor, item, origin, token };

        return super.applyChange(targetDoc, change, options);
    }

    static async createRollModifier(parent: ItemAFMBE, data: DeepPartial<CreatureModifier>) {
        data.label ||= parent.name;
        data.affects ??= "all";
        data.value ??= 1;

        const source: PreCreate<ActiveEffectSource> = {
            name: data.label,
            system: {
                changes: [
                    {
                        key: "system.modifiers",
                        phase: "final",
                        type: "add",
                        value: data,
                    },
                ],
            },
        };

        return parent.createEmbeddedDocuments("ActiveEffect", [source]);
    }

    updateChange(index: number, value: any): Promise<this | undefined> | undefined {
        const changes = this._source.system.changes?.slice() ?? [];
        const change = changes.at(index);

        if (change) {
            change.value = value;
            return this.update({ "system.changes": changes });
        }
    }
}

export { ActiveEffectAFMBE };
