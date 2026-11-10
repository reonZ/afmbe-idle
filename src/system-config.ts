import { CharacterType } from "actor";

const config = {
    ATTRIBUTES: {
        CATEGORY: {
            inspired: 20,
            norm: 14,
            survivor: 20,
        } satisfies Record<CharacterType, number>,
        DRAWBACK_COST: 1,
        IMPROVEMENT: {
            low: 5,
            high: 10,
        },
        MAX_HUMAN_LEVEL: 6,
    },
};

export default config;
