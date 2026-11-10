import { ActorDataModel } from "actor";
import { PositiveIntegerField } from "fields";
import { Creature, CreatureDataSchema, CreatureLife, CreatureSystem } from ".";
import fields = foundry.data.fields;

class CreatureDataModel<
    TParent extends Creature = Creature,
    TSchema extends CreatureDataSchema = CreatureDataSchema,
> extends ActorDataModel<TParent, TSchema> {
    static defineSchema(): CreatureDataSchema {
        return {
            ...super.defineSchema(),
            life: new fields.SchemaField({
                value: new PositiveIntegerField(),
            }),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        this.life.total = 0;
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();

        const parent = this.parent;

        parent.life = new CreatureLife(parent);
    }
}

interface CreatureDataModel<TParent extends Creature, TSchema extends CreatureDataSchema> extends CreatureSystem {}

export { CreatureDataModel };
