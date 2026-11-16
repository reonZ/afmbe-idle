import { CREATURE_ATTRIBUTES, CreatureDataModel, CreatureDataSource } from "actor";
import { ItemType } from "item";
import * as R from "remeda";
import { Character, CharacterDataSchema, CharacterDataSource } from ".";
import fields = foundry.data.fields;
import { PositiveIntergerValueField } from "fields";

class CharacterDataModel<
    TParent extends Character = Character,
    TSchema extends CharacterDataSchema = CharacterDataSchema,
> extends CreatureDataModel<TParent, TSchema> {
    // static defineSchema(): CharacterDataSchema {
    //     return {
    //         ...super.defineSchema(),
    //         attributes: new fields.SchemaField({
    //             ...R.fromKeys(CREATURE_ATTRIBUTES, () => {
    //                 return new PositiveIntergerValueField();
    //             }),
    //         }),
    //     };
    // }

    get allowedItems(): ItemType[] {
        return ["armor", "quality", "skill", "weapon"];
    }
}

interface CharacterDataModel<TParent extends Character = Character> extends Omit<
    CharacterDataSource,
    keyof CreatureDataSource
> {}

export { CharacterDataModel };
