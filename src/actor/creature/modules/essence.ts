import { ActorModule } from "actor";
import { Creature } from "..";

class CreatureEssence<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get current(): number {
        return Math.min(this.actor.system.essence.value, this.max);
    }

    get max(): number {
        return this.actor.system.essence.total;
    }

    get label(): string {
        return _loc("afmbe.actor.essence.label");
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.essence.value": Math.min(value, this.max) });
    }
}

export { CreatureEssence };
