const CREATURE_TYPES = ["adversary", "character", "zombie"] as const;

const CREATURE_ATTRIBUTES = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "perception",
    "willpower",
] as const;

export { CREATURE_ATTRIBUTES, CREATURE_TYPES };
