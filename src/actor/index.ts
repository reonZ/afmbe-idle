export * from "./base";
export * from "./creature";
export * from "./adversary";
export * from "./character";
export * from "./zombie";

import { CharacterDataModel, CharacterSheet } from "./character";
export const ACTOR_CONFIG = [{ data: CharacterDataModel, sheet: CharacterSheet, type: "character" }];
