import { ActorSheetConfiguration, CharacterSheet } from "actor";
import { Member } from "..";

class MemberSheet extends CharacterSheet<Member> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["member"],
    };
}

export { MemberSheet };
