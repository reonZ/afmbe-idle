import { CharacterType } from "actor";

const config = {
    ATTRIBUTES: {
        inspired: 20,
        norm: 14,
        survivor: 20,
    } satisfies Record<CharacterType, number>,
    ATTRIBUTE_DRAWBACK_COST: 1,
    ATTRIBUTE_IMPROVEMENTS: {
        low: 5,
        high: 10,
    },
};

export default config;
