import fields = foundry.data.fields;

type CharacterExperienceSchema = {
    current: fields.NumberField<number, number, true, false, true>;
    total: fields.NumberField<number, number, true, false, true>;
};

type CharacterExperienceSource = fields.SourceFromSchema<CharacterExperienceSchema>;

export type { CharacterExperienceSchema, CharacterExperienceSource };
