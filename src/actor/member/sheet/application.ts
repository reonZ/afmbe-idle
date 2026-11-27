import { CharacterSheetAFMBE, CharacterSheetConfiguration } from "actor";
import { MemberAFMBE } from "..";

class MemberSheetAFMBE extends CharacterSheetAFMBE<MemberAFMBE> {
    static DEFAULT_OPTIONS: DeepPartial<CharacterSheetConfiguration> = {
        classes: ["member"],
    };
}

export { MemberSheetAFMBE };
