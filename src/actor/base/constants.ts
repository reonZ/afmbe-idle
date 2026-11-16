const ACTOR_CHARACTER_TYPES = ["adversary", "member"] as const;
const ACTOR_CREATURE_TYPES = [...ACTOR_CHARACTER_TYPES, "zombie"] as const;
const ACTOR_TYPES = [...ACTOR_CREATURE_TYPES] as const;

export { ACTOR_CHARACTER_TYPES, ACTOR_CREATURE_TYPES, ACTOR_TYPES };
