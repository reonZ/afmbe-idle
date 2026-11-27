import { ActiveEffectChangeData } from "@7h3laughingman/foundry-types/client/documents/_types.mjs";
import { ActorAFMBE } from "actor";
import { ItemAFMBE } from "item";
import { TokenDocumentAFMBE } from "misc";

class ActiveEffectAFMBE extends foundry.documents.ActiveEffect<ActorAFMBE | ItemAFMBE | null> {
    static applyChange(
        targetDoc: ActorAFMBE | ItemAFMBE | TokenDocumentAFMBE,
        change: ActiveEffectChangeData,
        options: { replacementData?: Record<string, any>; modifyTarget?: boolean } = {},
    ): Record<string, unknown> {
        const actor = targetDoc instanceof ActorAFMBE ? targetDoc : targetDoc.actor;
        const item = targetDoc instanceof ItemAFMBE ? targetDoc : null;
        const token = targetDoc instanceof TokenDocumentAFMBE ? targetDoc : (actor?.token ?? null);
        const origin = item?.isOfType("effect") ? item.system.origin : null;

        // we use @actor, @item, @origin and @token replacement data
        options.replacementData = { actor, item, origin, token };

        return super.applyChange(targetDoc, change, options);
    }
}

export { ActiveEffectAFMBE };
