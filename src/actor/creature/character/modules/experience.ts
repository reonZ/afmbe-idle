import { ActorModule, Character } from "actor";
import * as R from "remeda";

class CharacterExperienceModule extends ActorModule<Character> {
    get current(): number {
        return Math.min(this.actor.system.experience.value, this.total);
    }

    get total(): number {
        return this.actor.system.experience.total;
    }

    get spent(): number {
        return this.total - this.current;
    }

    giveExperience(value: number): Promise<Character | undefined> {
        return this.update({ total: this.total + value, value: this.current + value });
    }

    update(changes: Partial<ValueAndTotal>): Promise<Character | undefined> {
        if (R.isNumber(changes.total)) {
            changes.total = Math.max(changes.total, 0);
        }

        if (R.isNumber(changes.value)) {
            const total = changes.total ?? this.total;
            changes.value = Math.clamp(changes.value, 0, total);
        }

        return this.actor.update({ "system.experience": changes });
    }
}

export { CharacterExperienceModule };
