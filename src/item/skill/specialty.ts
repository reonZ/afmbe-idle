import { signedNumber } from "utils";
import { Skill, SkillSpecialtySource } from ".";

class Specialty<TParent extends Skill = Skill> {
    #parent: TParent;

    constructor(parent: TParent, source: SkillSpecialtySource) {
        this.#parent = parent;
        Object.assign(this, source);
    }

    get label(): string {
        return `${this.item.name} [${this.name}]`;
    }

    get actor(): TParent["actor"] {
        return this.item.actor;
    }

    get item(): TParent {
        return this.#parent;
    }

    get longId(): string {
        return this.item.id + "." + this.slug;
    }

    get uuid(): string {
        return this.item.uuid + ".Specialty." + this.slug;
    }

    get total(): number {
        return this.item.system.level.value + this.level.value;
    }

    get modifier(): string {
        return signedNumber(this.total);
    }
}

interface Specialty<TParent extends Skill = Skill> extends SkillSpecialtySource {}

export { Specialty };
