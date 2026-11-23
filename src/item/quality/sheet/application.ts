import { Creature } from "actor";
import { ItemSheetAFMBE, Quality } from "item";
import { QualitySheetConfiguration } from ".";

class QualitySheet<
    TParent extends Quality<Creature | null> = Quality<Creature | null>,
> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<QualitySheetConfiguration> = {
        classes: ["quality"],
    };
}

export { QualitySheet };
