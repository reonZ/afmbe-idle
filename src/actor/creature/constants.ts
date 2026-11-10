const CREATURE_ATTRIBUTES = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "perception",
    "willpower",
] as const;

const CREATURE_SECONDARY_ATTRIBUTES = ["life", "endurance", "speed", "essence"] as const;

export { CREATURE_ATTRIBUTES, CREATURE_SECONDARY_ATTRIBUTES };
