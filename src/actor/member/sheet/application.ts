import { ActorSheetConfiguration, CreatureSheet } from "actor";
import { Member } from "..";

class MemberSheet extends CreatureSheet<Member> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["member"],
    };
}

export { MemberSheet };
