import { ActorModule } from "actor";
import * as R from "remeda";
import { localize } from "utils";
import { Creature } from "..";

class CreatureEssence<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get label(): string {
        return localize("actor.creature.essence.label");
    }

    _initialize(): void {
        const attributes = this.actor.system.attributes.toObect();
        this.max = R.sum(R.values(attributes));
        this.value = Math.min(this.actor.system.essence.value, this.max);
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.essence.value": Math.min(value, this.max) });
    }
}

interface CreatureEssence extends ValueAndMax {}

export { CreatureEssence };
