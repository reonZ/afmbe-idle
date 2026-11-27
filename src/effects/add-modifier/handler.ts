import type { ActiveEffectChangeData } from "@7h3laughingman/foundry-types/client/documents/_types.mjs";
import { ActorAFMBE, CreatureAFMBE, CREATURE_MODIFIER_TYPES, CreatureModifier } from "actor";
import * as R from "remeda";

async function addModifierActiveEffectHandler(actor: unknown, change: ActiveEffectChangeData) {
    if (!isModifierActor(actor) || !isModifierData(change.value)) return;

    change.value.label ||= change.effect?.item.name;
    if (!R.isString(change.value.label)) return;

    if (R.isString(change.value.value)) {
        const field = new foundry.data.fields.NumberField();
        const data = { actor, item: change.effect?.item };

        try {
            const result = field._castChangeDelta(change.value.value, data);
            change.value.value = result;
        } catch {}
    }

    if (!change.value.value) return;

    change.value.origin ||= change.effect?.item.uuid;
    change.value.type = R.isIncludedIn(change.value.type, CREATURE_MODIFIER_TYPES) ? change.value.type : "all";

    actor.system.modifiers.push(change.value);
}

function isModifierActor(actor: unknown): actor is CreatureAFMBE {
    return actor instanceof ActorAFMBE && actor.isOfType("creature");
}

function isModifierData(data: unknown): data is CreatureModifier {
    return R.isObjectType(data) && "value" in data && R.isIncludedIn(typeof data.value, ["number", "string"]);
}

export { addModifierActiveEffectHandler };
