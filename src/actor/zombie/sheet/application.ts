import { CreatureSheetAFMBE, CreatureSheetConfiguration } from "actor";
import { ZombieAFMBE } from "..";

class ZombieSheetAFMBE extends CreatureSheetAFMBE<ZombieAFMBE> {
    static DEFAULT_OPTIONS: DeepPartial<CreatureSheetConfiguration> = {
        classes: ["zombie"],
    };
}

export { ZombieSheetAFMBE };
