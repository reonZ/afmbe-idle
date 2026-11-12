import { ActorModule } from "actor";
import { Creature } from "..";
import { localize } from "utils";

class CreatureEndurance<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get label(): string {
        return localize("actor.creature.endurance.label");
    }

    _initialize(): void {
        const { constitution, strength, willpower } = this.actor.system.attributes;
        this.max = (constitution + strength + willpower) * 3 + 5;
        this.value = Math.min(this.actor.system.endurance.value, this.max);
    }

    update(value: number): Promise<TParent | undefined> {
        return this.actor.update({ "system.endurance.value": Math.min(value, this.max) });
    }
}

interface CreatureEndurance extends ValueAndMax {}

export { CreatureEndurance };
