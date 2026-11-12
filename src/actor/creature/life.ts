import { ActorModule } from "actor";
import { Creature } from "..";
import { localize } from "utils";

class CreatureLife<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get label(): string {
        return localize("actor.creature.life.label");
    }

    _initialize(): void {
        const { constitution, strength } = this.actor.system.attributes;
        this.max = (constitution + strength) * 4 + 10;
        this.value = Math.min(this.actor.system.life.value, this.max);
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.life.value": Math.min(value, this.max) });
    }
}

interface CreatureLife extends ValueAndMax {}

export { CreatureLife };
