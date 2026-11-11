import { ActorModule } from "actor";
import { Creature } from "..";
import { localize } from "utils";

class CreatureEndurance<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get current(): number {
        return Math.min(this.actor.system.endurance.value, this.max);
    }

    get max(): number {
        return this.actor.system.endurance.total;
    }

    get label(): string {
        return localize("actor.creature.endurance.label");
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.endurance.value": Math.min(value, this.max) });
    }
}

export { CreatureEndurance };
