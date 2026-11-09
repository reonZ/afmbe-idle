const ACTOR_CREATURE_TYPES = ["adversary", "character", "zombie"] as const;
const ACTOR_TYPES = [...ACTOR_CREATURE_TYPES] as const;

export { ACTOR_CREATURE_TYPES, ACTOR_TYPES };
