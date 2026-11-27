import { CreatureDataModel, CreatureDataSource } from "actor";
import { ItemType } from "item";
import { CharacterAFMBE, CharacterDataSchema, CharacterDataSource } from ".";

class CharacterDataModel<
    TParent extends CharacterAFMBE = CharacterAFMBE,
    TSchema extends CharacterDataSchema = CharacterDataSchema,
> extends CreatureDataModel<TParent, TSchema> {
    get allowedItems(): ItemType[] {
        return ["armor", "quality", "skill", "weapon"];
    }
}

interface CharacterDataModel<TParent extends CharacterAFMBE = CharacterAFMBE> extends Omit<
    CharacterDataSource,
    keyof CreatureDataSource
> {}

export { CharacterDataModel };
