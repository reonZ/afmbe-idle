import { ActorAFMBE } from "actor";
import { ItemCollection, Skill } from "item";
import { SkillSpecialty } from ".";

class SkillSpecialtyCollection<TActor extends ActorAFMBE | null = ActorAFMBE | null> extends ItemCollection<
    Skill<TActor>,
    SkillSpecialty<TActor>
> {
    _initialize(): void {
        for (const specialty of this.item.system.specialties) {
            this.set(specialty.id, new SkillSpecialty(this, specialty));
        }
    }
}

export { SkillSpecialtyCollection };
