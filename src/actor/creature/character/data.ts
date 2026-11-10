import { CREATURE_ATTRIBUTES, CreatureDataModel } from "actor";
import { BooleanField, PositiveIntegerField, ValueAndTotalField } from "fields";
import * as R from "remeda";
import { Character, CHARACTER_TYPES, CharacterDataSchema, CharacterDataSource, CharacterSystem } from ".";
import fields = foundry.data.fields;

class CharacterDataModel extends CreatureDataModel<Character, CharacterDataSchema> {
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

    prepareBaseData(): void {
        super.prepareBaseData();

        const source = this as CharacterDataSource;

        this.attributes = R.mapValues(
            source.attributes,
            ({ base, drawback, improved }) => base + drawback + Number(improved),
        );
    }
}

interface CharacterDataModel extends CharacterSystem {}

export { CharacterDataModel };
