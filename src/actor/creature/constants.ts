const CREATURE_ATTRIBUTES = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "perception",
    "willpower",
] as const;

const CREATURE_SECONDARIES = ["life", "endurance", "essence"] as const;

export { CREATURE_ATTRIBUTES, CREATURE_SECONDARIES };
