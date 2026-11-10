import { ActorModule } from "actor";
import { Creature } from "..";

class CreatureEndurance<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get current(): number {
        return Math.min(this.actor.system.endurance.value, this.max);
    }

    get max(): number {
        return this.actor.system.endurance.total;
    }

    get label(): string {
        return _loc("afmbe.actor.endurance.label");
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.endurance.value": Math.min(value, this.max) });
    }
}

export { CreatureEndurance };
