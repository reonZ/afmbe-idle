import { ActorAFMBE } from "actor";
import { Skill, SkillSpecialtySource } from "item";
import type { SkillSpecialtiesModule } from ".";
import { signedNumber } from "utils";

class SkillSpecialty<TActor extends ActorAFMBE | null = ActorAFMBE | null> {
    #parent: SkillSpecialtiesModule;

    constructor(parent: SkillSpecialtiesModule<TActor>, source: SkillSpecialtySource) {
        Object.assign(this, source);
        this.#parent = parent;
    }

    get label(): string {
        return `${this.item.name} [${this.name}]`;
    }

    get actor(): TActor {
        return this.item.actor;
    }

    get item(): Skill<TActor> {
        return this.#parent.item as Skill<TActor>;
    }

    get uuid(): string {
        return this.item.id + ".Specialty." + this.id;
    }

    get total(): number {
        return this.item.level + this.level;
    }

    get bonus(): string {
        return signedNumber(this.total);
    }
}

interface SkillSpecialty extends SkillSpecialtySource {}

export { SkillSpecialty };
