import { CharacterSheet, CharacterSheetConfiguration } from "actor";
import { Adversary } from "..";

class AdversarySheet extends CharacterSheet<Adversary> {
    static DEFAULT_OPTIONS: DeepPartial<CharacterSheetConfiguration> = {
        classes: ["adversary"],
    };
}

export { AdversarySheet };
