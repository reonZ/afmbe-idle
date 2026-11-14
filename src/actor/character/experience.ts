import { ActorModule, Character } from "actor";
import * as R from "remeda";

class CharacterExperience<TParent extends Character = Character> extends ActorModule<TParent> {
    _initialize(): void {
        this.total = this.parent.system.experience.total;
        this.value = Math.min(this.parent.system.experience.value, this.total);
    }

    giveExperience(value: number): Promise<Character | undefined> {
        return this.update({ max: this.total + value, value: this.value + value });
    }

    update(changes: Partial<ValueAndMax>): Promise<Character | undefined> {
        if (R.isNumber(changes.max)) {
            changes.max = Math.max(changes.max, 0);
        }

        if (R.isNumber(changes.value)) {
            const total = changes.max ?? this.total;
            changes.value = Math.clamp(changes.value, 0, total);
        }

        return this.parent.update({ "system.experience": changes });
    }
}

interface CharacterExperience extends ValueAndTotal {}

export { CharacterExperience };
