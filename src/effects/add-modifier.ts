import type { ActiveEffectChangeData } from "@7h3laughingman/foundry-types/client/documents/_types.mjs";
import { ActorAFMBE, Creature, CreatureModifier } from "actor";
import * as R from "remeda";

function addModifierActiveEffectHandler(actor: unknown, change: ActiveEffectChangeData) {
    if (!isModifierActor(actor) || !isModifierData(change.value)) return;

    if (R.isString(change.value.value)) {
        const field = new foundry.data.fields.NumberField();
        const data = { actor, item: change.effect?.item };

        try {
            const result = field._castChangeDelta(change.value.value, data);
            change.value.value = result;
        } catch {}
    }

    actor.system.modifiers.push(change.value);
}

function isModifierActor(actor: unknown): actor is Creature {
    return actor instanceof ActorAFMBE && actor.isOfType("creature");
}

function isModifierData(data: unknown): data is CreatureModifier {
    return (
        R.isObjectType(data) &&
        "label" in data &&
        "value" in data &&
        R.isString(data.label) &&
        R.isIncludedIn(typeof data.value, ["number", "string"])
    );
}

export { addModifierActiveEffectHandler };
