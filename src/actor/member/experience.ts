import { ActorModule, MemberAFMBE } from "actor";
import * as R from "remeda";

class MemberExperience<TParent extends MemberAFMBE = MemberAFMBE> extends ActorModule<TParent> {
    _initialize(): void {
        this.total = this.parent.system.experience.total;
        this.value = Math.min(this.parent.system.experience.value, this.total);
    }

    giveExperience(value: number): Promise<MemberAFMBE | undefined> {
        return this.update({ max: this.total + value, value: this.value + value });
    }

    update(changes: Partial<ValueAndMax>): Promise<MemberAFMBE | undefined> {
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

interface MemberExperience extends ValueAndTotal {}

export { MemberExperience };
