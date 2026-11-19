const CREATURE_ATTRIBUTES = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "perception",
    "willpower",
] as const;

const CREATURE_SECONDARIES = ["life", "endurance", "essence"] as const;

const CREATURE_MODIFIER_TYPES = ["all", "task", "test"] as const;

export { CREATURE_ATTRIBUTES, CREATURE_MODIFIER_TYPES, CREATURE_SECONDARIES };
