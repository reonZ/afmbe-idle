import { CREATURE_ATTRIBUTES, CreatureDataModel, CreatureDataSource } from "actor";
import { BooleanField, PositiveIntegerField, ValueAndTotalField } from "fields";
import { ItemType } from "item";
import * as R from "remeda";
import {
    Character,
    CHARACTER_TYPES,
    CharacterAttributes,
    CharacterDataSchema,
    CharacterDataSource,
    CharacterExperience,
} from ".";
import fields = foundry.data.fields;

class CharacterDataModel<TParent extends Character = Character> extends CreatureDataModel<
    TParent,
    CharacterDataSchema
> {
    static defineSchema(): CharacterDataSchema {
        return {
            ...super.defineSchema(),
            attributes: new fields.SchemaField({
                ...R.fromKeys(CREATURE_ATTRIBUTES, () => {
                    return new fields.SchemaField({
                        base: new PositiveIntegerField(),
                        drawback: new PositiveIntegerField(),
                        improved: new BooleanField(),
                    });
                }),
            }),
            details: new fields.SchemaField({
                description: new fields.HTMLField(),
                personality: new fields.HTMLField(),
                quote: new fields.HTMLField(),
            }),
            experience: new ValueAndTotalField(),
            type: new fields.StringField({
                required: true,
                nullable: false,
                initial: "norm",
                choices: CHARACTER_TYPES,
            }),
        };
    }

    get allowedItems(): ItemType[] {
        return ["armor", "quality", "skill", "weapon"];
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        this.attributes = new CharacterAttributes(this.parent);
        this.experience = new CharacterExperience(this.parent);
    }
}

interface CharacterDataModel<TParent extends Character = Character> extends Omit<
    CharacterDataSource,
    keyof CreatureDataSource | "attributes" | "experience"
> {
    attributes: CharacterAttributes;
    experience: CharacterExperience;
}

export { CharacterDataModel };
