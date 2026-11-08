import { ActorAFMBE, CharacterDataModel, ZombieDataModel } from "actor";
import { ItemAFMBE } from "item";
import config from "./config";

Hooks.once("init", () => {
    CONFIG.AFMBE = config;

    CONFIG.Actor.documentClass = ActorAFMBE;
    CONFIG.Item.documentClass = ItemAFMBE;

    CONFIG.Actor.dataModels.character = CharacterDataModel;
    CONFIG.Actor.dataModels.zombie = ZombieDataModel;
});
