import { ActorSheetConfiguration, CreatureSheet } from "actor";
import { Character } from "..";

class CharacterSheet extends CreatureSheet<Character> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["character"],
    };
}

export { CharacterSheet };
