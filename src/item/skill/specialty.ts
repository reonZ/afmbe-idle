import { signedNumber } from "utils";
import { Skill, SkillSpecialtySource } from ".";

class Specialty<TParent extends Skill = Skill> {
    #parent: TParent;

    constructor(parent: TParent, source: SkillSpecialtySource) {
        this.#parent = parent;
        Object.assign(this, source);
    }

    get slug() {
        return this.name.slugify({ strict: true });
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

    get bonus(): number {
        return this.#parent.system.bonus + this.level.value * 2;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }
}

interface Specialty<TParent extends Skill = Skill> extends SkillSpecialtySource {}

export { Specialty };
