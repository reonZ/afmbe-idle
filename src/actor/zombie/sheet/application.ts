import { ActorSheetConfiguration, CharacterSheet } from "actor";
import { Zombie } from "..";

class ZombieSheet extends CharacterSheet<Zombie> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["zombie"],
    };
}

export { ZombieSheet };
