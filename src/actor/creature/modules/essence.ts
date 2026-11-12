import { ActorModule } from "actor";
import { Creature } from "..";
import { localize } from "utils";

class CreatureEssence<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get current(): number {
        return Math.min(this.actor.system.essence.value, this.max);
    }

    get max(): number {
        return this.actor.system.essence.max;
    }

    get label(): string {
        return localize("actor.creature.essence.label");
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.essence.value": Math.min(value, this.max) });
    }
}

export { CreatureEssence };
