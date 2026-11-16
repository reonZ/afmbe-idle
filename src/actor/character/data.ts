import { CreatureDataModel, CreatureDataSource } from "actor";
import { ItemType } from "item";
import { Character, CharacterDataSchema, CharacterDataSource } from ".";

class CharacterDataModel<
    TParent extends Character = Character,
    TSchema extends CharacterDataSchema = CharacterDataSchema,
> extends CreatureDataModel<TParent, TSchema> {
    get allowedItems(): ItemType[] {
        return ["armor", "quality", "skill", "weapon"];
    }
}

interface CharacterDataModel<TParent extends Character = Character> extends Omit<
    CharacterDataSource,
    keyof CreatureDataSource
> {}

export { CharacterDataModel };
