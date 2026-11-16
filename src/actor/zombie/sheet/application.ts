import { ActorSheetConfiguration, CreatureSheet } from "actor";
import { Zombie } from "..";

class ZombieSheet extends CreatureSheet<Zombie> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["zombie"],
    };
}

export { ZombieSheet };
