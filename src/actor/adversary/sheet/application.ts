import { CharacterSheetAFMBE, CharacterSheetConfiguration } from "actor";
import { AdversaryAFMBE } from "..";

class AdversarySheetAFMBE extends CharacterSheetAFMBE<AdversaryAFMBE> {
    static DEFAULT_OPTIONS: DeepPartial<CharacterSheetConfiguration> = {
        classes: ["adversary"],
    };
}

export { AdversarySheetAFMBE };
