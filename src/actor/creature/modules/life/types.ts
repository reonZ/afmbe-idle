import fields = foundry.data.fields;

type CreatureLifeSchema = {
    value: fields.NumberField<number, number, true, false, true>;
};

type CreatureLifeSource = fields.SourceFromSchema<CreatureLifeSchema>;

export type { CreatureLifeSchema, CreatureLifeSource };
