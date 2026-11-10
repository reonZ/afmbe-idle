import { Character } from "actor";
import { CharacterExperienceSource } from "..";

class CharacterExperience {
    #parent: Character;

    constructor(parent: Character) {
        this.#parent = parent;
    }

    get actor(): Character {
        return this.#parent;
    }

    /** how many points of experience have been spent */
    get spent(): number {
        return this.total - this.current;
    }

    /** alias of current */
    get remaining(): number {
        return this.current;
    }

    /** give experience points to the character, it updates both current and total */
    giveExperience(value: number): Promise<Character | undefined> {
        return this.update({
            current: this.current + value,
            total: this.total + value,
        });
    }

    /** convenient update method */
    async update(value: CharacterExperienceSource): Promise<Character | undefined> {
        return this.actor.update({ "system.experience": value });
    }
}

interface CharacterExperience extends CharacterExperienceSource {}

export { CharacterExperience };
