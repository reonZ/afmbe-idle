import { ActorModule } from "actor";
import { Creature } from "..";
import { localize } from "utils";

class CreatureSpeed<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get label(): string {
        return localize("actor.creature.speed.label");
    }

    get shortUnit(): string {
        return localize("actor.creature.speed", this.useMetric ? "mps" : "yps");
    }

    get shortValue(): number {
        return this.actor.system.speed.value / 2;
    }

    get stringified(): string {
        return `${this.value} ${this.unit} (${this.shortValue} ${this.shortUnit})`;
    }

    get unit(): string {
        return localize("actor.creature.speed", this.useMetric ? "kph" : "mph");
    }

    get useMetric(): boolean {
        return game.afmbe.settings.metric;
    }

    get value(): number {
        const value = this.actor.system.speed.value;
        return this.useMetric ? value * 1.5 : value;
    }
}

export { CreatureSpeed };
