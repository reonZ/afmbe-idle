import { CharacterDataModel, CharacterSheet } from "./character";

export * from "./base";
export * from "./creature";
export * from "./adversary";
export * from "./character";
export * from "./zombie";

export const ACTOR_CONFIG = [{ data: CharacterDataModel, sheet: CharacterSheet, type: "character" }];
