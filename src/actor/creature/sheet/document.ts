import { ActorSheetAFMBE } from "actor";
import { Creature } from "..";

abstract class CreatureSheet<TActor extends Creature> extends ActorSheetAFMBE<TActor> {}

export { CreatureSheet };
