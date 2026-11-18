import { CharacterSheet, CharacterSheetConfiguration } from "actor";
import { Member } from "..";

class MemberSheet extends CharacterSheet<Member> {
    static DEFAULT_OPTIONS: DeepPartial<CharacterSheetConfiguration> = {
        classes: ["member"],
    };
}

export { MemberSheet };
