import { DatabaseUpdateCallbackOptions } from "@7h3laughingman/foundry-types/common/abstract/_types.mjs";
import { CreatureDataModel } from "actor";
import {
    Character,
    CHARACTER_TYPES,
    CharacterAttributes,
    CharacterAttributesField,
    CharacterDataSchema,
    CharacterDataSource,
    CharacterExperience,
    CharacterExperienceField,
    CharacterSource,
} from ".";
import * as R from "remeda";
import fields = foundry.data.fields;

class CharacterDataModel extends CreatureDataModel<Character, CharacterDataSchema> {
    static defineSchema(): CharacterDataSchema {
        return {
            ...super.defineSchema(),
            attributes: new CharacterAttributesField(),
            details: new fields.SchemaField({
                description: new fields.HTMLField(),
                personality: new fields.HTMLField(),
                quote: new fields.HTMLField(),
            }),
            experience: new CharacterExperienceField(),
            type: new fields.StringField({
                required: true,
                nullable: false,
                initial: "norm",
                choices: CHARACTER_TYPES,
            }),
        };
    }

    get isInspired(): boolean {
        return this.type === "inspired";
    }

    get isNorm(): boolean {
        return this.type === "norm";
    }

    get isSurvivor(): boolean {
        return this.type === "survivor";
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        const parent = this.parent;

        parent.attributes = new CharacterAttributes(parent, this.attributes);
        parent.experience = new CharacterExperience(parent, this.experience);
    }

    protected _preCreate(
        data: DeepPartial<CharacterSource>,
        options: foundry.abstract.DatabaseCreateCallbackOptions,
        user: User,
    ): Promise<boolean | void> {
        if (this.#updateSourceObject(data)) {
            console.log("updated");
            this.parent.updateSource(data);
        }
        return super._preCreate(data, options, user);
    }

    protected _preUpdate(
        changes: DeepPartial<CharacterSource>,
        options: DatabaseUpdateCallbackOptions,
        user: User,
    ): Promise<boolean | void> {
        this.#updateSourceObject(changes);
        return super._preUpdate(changes, options, user);
    }

    #updateSourceObject(source: DeepPartial<CharacterSource>) {
        let updated = false;
        const system = source.system;

        // we always make sure current exp is not higher than total
        if (R.isObjectType(system?.experience)) {
            const total = system.experience.total ?? this.experience.total;

            if (
                (R.isNumber(system.experience.current) && system.experience.current > total) ||
                this.experience.current > total
            ) {
                system.experience.current = total;
                updated = true;
            }
        }

        return updated;
    }
}

interface CharacterDataModel extends CharacterDataSource {}

export { CharacterDataModel };
