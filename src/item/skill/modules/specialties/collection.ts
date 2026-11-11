import { ActorAFMBE } from "actor";
import { ItemModule, Skill, SkillSpecialty } from "item";
import * as R from "remeda";

class SkillSpecialtiesModule<TActor extends ActorAFMBE | null = ActorAFMBE | null> extends ItemModule<Skill<TActor>> {
    #collection: Collection<string, SkillSpecialty<TActor>>;

    [Symbol.iterator](): MapIterator<SkillSpecialty<TActor>> {
        return this.#collection.values();
    }

    constructor(parent: Skill<TActor>) {
        super(parent);
        this.#collection = new Collection(
            R.map(parent.system.specialties, (specialty) => [
                specialty.id,
                new SkillSpecialty<TActor>(this, specialty),
            ]),
        );
    }

    get(id: string): SkillSpecialty<TActor> | undefined {
        return this.#collection.get(id);
    }

    filter(condition: (value: SkillSpecialty<TActor>) => true): SkillSpecialty<TActor>[] {
        return this.#collection.filter(condition);
    }

    map<U>(
        transformer: (
            element: SkillSpecialty<TActor>,
            index: number,
            collection: Collection<string, SkillSpecialty<TActor>>,
        ) => U,
    ): U[] {
        return this.#collection.map((value, index) => transformer(value, index, this.#collection));
    }
}

export { SkillSpecialtiesModule };
