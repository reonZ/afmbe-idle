import { ActorAFMBE } from "actor";
import { Skill, SkillSpecialtySource } from "item";
import type { SkillSpecialtyCollection } from ".";
import { signedNumber } from "utils";

class SkillSpecialty<TActor extends ActorAFMBE | null = ActorAFMBE | null> {
    #parent: SkillSpecialtyCollection;

    constructor(parent: SkillSpecialtyCollection<TActor>, source: SkillSpecialtySource) {
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

    get longId(): string {
        return this.item.id + "." + this.id;
    }

    get uuid(): string {
        return this.item.uuid + ".Specialty." + this.id;
    }

    get total(): number {
        return this.item.system.level + this.level;
    }

    get bonus(): string {
        return signedNumber(this.total);
    }
}

interface SkillSpecialty extends SkillSpecialtySource {}

export { SkillSpecialty };
