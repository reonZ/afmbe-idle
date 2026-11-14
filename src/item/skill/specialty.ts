import { signedNumber } from "utils";
import { Skill, SkillSpecialtySource } from ".";

class Specialty<TParent extends Skill = Skill> {
    parent: TParent;

    constructor(parent: TParent, source: SkillSpecialtySource) {
        this.parent = parent;
        Object.assign(this, source);
    }

    get label(): string {
        return `${this.parent.name} [${this.name}]`;
    }

    get actor(): TParent["actor"] {
        return this.parent.actor;
    }

    get longId(): string {
        return this.parent.id + "." + this.slug;
    }

    get bonus(): number {
        return this.parent.system.bonus + this.level.value * 2;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }
}

interface Specialty<TParent extends Skill = Skill> extends SkillSpecialtySource {}

export { Specialty };
