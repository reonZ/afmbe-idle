import { CharacterDataModel, CharacterDataSource, CREATURE_ATTRIBUTES } from "actor";
import { BooleanField, PositiveIntegerField, ValueAndTotalField } from "fields";
import * as R from "remeda";
import { Member, MEMBER_CATEGORY, MemberAttributes, MemberDataSchema, MemberDataSource, MemberExperience } from ".";
import fields = foundry.data.fields;

class MemberDataModel<TParent extends Member = Member> extends CharacterDataModel<TParent, MemberDataSchema> {
    static defineSchema(): MemberDataSchema {
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
            category: new fields.StringField({
                required: true,
                nullable: false,
                initial: "norm",
                choices: MEMBER_CATEGORY,
            }),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        this.attributes = new MemberAttributes(this.parent);
        this.experience = new MemberExperience(this.parent);
    }
}

interface MemberDataModel<TParent extends Member = Member> extends Omit<
    MemberDataSource,
    keyof CharacterDataSource | "attributes" | "experience"
> {
    attributes: MemberAttributes;
    experience: MemberExperience;
}

export { MemberDataModel };
