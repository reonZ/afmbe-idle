import { ActorModule } from "actor";
import { Creature } from "..";
import { localize } from "utils";

class CreatureLife<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get current(): number {
        return Math.min(this.actor.system.life.value, this.max);
    }

    get max(): number {
        return this.actor.system.life.total;
    }

    get label(): string {
        return localize("actor.creature.life.label");
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.life.value": Math.min(value, this.max) });
    }
}

export { CreatureLife };
