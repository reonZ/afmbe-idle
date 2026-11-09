import { ActorAFMBE, CharacterDataModel, ZombieDataModel } from "actor";
import { ItemAFMBE, QualityDataModel, SkillDataModel } from "item";
import config from "./config";
import { AdversaryDataModel } from "actor/adversary";

Hooks.once("init", () => {
    CONFIG.AFMBE = config;

    CONFIG.Actor.documentClass = ActorAFMBE;
    CONFIG.Actor.dataModels.adversary = AdversaryDataModel;
    CONFIG.Actor.dataModels.character = CharacterDataModel;
    CONFIG.Actor.dataModels.zombie = ZombieDataModel;

    CONFIG.Item.documentClass = ItemAFMBE;
    CONFIG.Item.dataModels.quality = QualityDataModel;
    CONFIG.Item.dataModels.skill = SkillDataModel;
});
