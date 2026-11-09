import { ActorModule, CREATURE_ATTRIBUTES, CreatureAttribute } from "actor";
import * as R from "remeda";
import { CharacterAttributeSource, CharacterAttributesSource } from ".";
import { Character, CharacterDataSource } from "..";

class CharacterAttributes extends ActorModule<CharacterAttributesSource, Character> {
    static key: keyof CharacterDataSource = "attributes";

    /** the limit of points based on the character category */
    get limit(): number {
        return CONFIG.AFMBE.ATTRIBUTES.CATEGORY[this.actor.system.type];
    }

    /** the limit of points, extended by drawbacks & improvements */
    get extendedLimit(): number {
        return this.limit + R.sumBy(CREATURE_ATTRIBUTES, (key) => this.getExtendedValue(key));
    }

    /** how many point have been spent during character creation */
    get basePoints(): number {
        return R.sumBy(CREATURE_ATTRIBUTES, (key) => this[key].base);
    }

    /** how many points have been spent in total */
    get totalPoints(): number {
        return R.sumBy(CREATURE_ATTRIBUTES, (key) => this.getValue(key));
    }

    /** total cost of all spent points */
    get totalCost(): number {
        return R.sumBy(CREATURE_ATTRIBUTES, (key) => this.getTotalCost(key));
    }

    /** the value for that attribute */
    getValue(key: CreatureAttribute): number {
        const { base, drawback, improved } = this[key];
        return base + drawback + Number(improved);
    }

    /** by how much this attribute has been extended */
    getExtendedValue(key: CreatureAttribute): number {
        const { drawback, improved } = this[key];
        return drawback + Number(improved);
    }

    /** the cost of points spent during creation for this attribute */
    getBaseCost(key: CreatureAttribute): number {
        const { base } = this[key];
        return base <= 0 ? 0 : base <= 5 ? 1 : 3;
    }

    /** the cost of drawback points spent for this attribute */
    getDrawbackCost(key: CreatureAttribute): number {
        const { base, drawback } = this[key];
        const drawbackCost = CONFIG.AFMBE.ATTRIBUTES.DRAWBACK_COST;
        return R.sum(R.times(drawback, (i) => drawbackCost * (base + i + 1)));
    }

    /** the cost of experience points spent for this attribute */
    getImprovedCost(key: CreatureAttribute): number {
        const { base, drawback, improved } = this[key];
        if (!improved) return 0;
        return base + drawback + 1 <= 5
            ? CONFIG.AFMBE.ATTRIBUTES.IMPROVEMENT.low
            : CONFIG.AFMBE.ATTRIBUTES.IMPROVEMENT.high;
    }

    /** the total cost of points spent for this attribute */
    getTotalCost(key: CreatureAttribute): number {
        return this.getBaseCost(key) + this.getDrawbackCost(key) + this.getImprovedCost(key);
    }

    /** convenient update method */
    async update(key: CreatureAttribute, value: CharacterAttributeSource): Promise<Character | undefined> {
        return this.actor.update({ [`system.attributes.${key}`]: value });
    }
}

interface CharacterAttributes extends CharacterAttributesSource {}

export { CharacterAttributes };
