const ITEM_PHYSICAL_TYPES = [] as const;
const ITEM_TYPES = [...ITEM_PHYSICAL_TYPES, "quality", "skill"] as const;

export { ITEM_PHYSICAL_TYPES, ITEM_TYPES };
