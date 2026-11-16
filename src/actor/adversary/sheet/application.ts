import { ActorSheetConfiguration, CharacterSheet } from "actor";
import { Adversary } from "..";

class AdversarySheet extends CharacterSheet<Adversary> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["adversary"],
    };
}

export { AdversarySheet };
