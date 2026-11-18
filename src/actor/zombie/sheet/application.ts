import { CreatureSheet, CreatureSheetConfiguration } from "actor";
import { Zombie } from "..";

class ZombieSheet extends CreatureSheet<Zombie> {
    static DEFAULT_OPTIONS: DeepPartial<CreatureSheetConfiguration> = {
        classes: ["zombie"],
    };
}

export { ZombieSheet };
