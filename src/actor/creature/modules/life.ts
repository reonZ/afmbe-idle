import { ActorModule } from "actor";
import { Creature } from "..";

class CreatureLife<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get current(): number {
        return Math.min(this.actor.system.life.value, this.total);
    }

    get total(): number {
        return this.actor.system.life.total;
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.life.value": Math.min(value, this.total) });
    }
}

export { CreatureLife };
