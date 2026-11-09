import { PHYSICAL_TYPES } from "item";

const ITEM_TYPES = [...PHYSICAL_TYPES, "quality", "skill"] as const;

export { ITEM_TYPES };
