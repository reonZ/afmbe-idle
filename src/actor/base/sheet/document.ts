import { ItemAFMBE } from "item";
import { ActorAFMBE } from "..";

abstract class ActorSheetAFMBE<TActor extends ActorAFMBE> extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {}

export { ActorSheetAFMBE };
