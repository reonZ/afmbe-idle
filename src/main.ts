import { ActorAFMBE, AdversaryDataModel, CharacterDataModel, CharacterSheet, ZombieDataModel } from "actor";
import handlebarsHelpers from "handlebars-helpers";
import { ArmorDataModel, ItemAFMBE, QualityDataModel, SkillDataModel, WeaponDataModel } from "item";
import { registerSettings } from "settings";
import config from "system-config";

Hooks.once("init", () => {
    CONFIG.AFMBE = config;

    CONFIG.Actor.documentClass = ActorAFMBE;
    CONFIG.Actor.dataModels.adversary = AdversaryDataModel;
    CONFIG.Actor.dataModels.character = CharacterDataModel;
    CONFIG.Actor.dataModels.zombie = ZombieDataModel;

    foundry.documents.collections.Actors.registerSheet("afmbe", CharacterSheet, {
        types: ["character"],
        makeDefault: true,
    });

    CONFIG.Item.documentClass = ItemAFMBE;
    CONFIG.Item.dataModels.armor = ArmorDataModel;
    CONFIG.Item.dataModels.quality = QualityDataModel;
    CONFIG.Item.dataModels.skill = SkillDataModel;
    CONFIG.Item.dataModels.weapon = WeaponDataModel;

    game.afmbe = {
        settings: {} as typeof game.afmbe.settings,
    };

    Handlebars.registerHelper(handlebarsHelpers);
    registerSettings();
});
