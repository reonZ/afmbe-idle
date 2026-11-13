import { ACTOR_CONFIG, ActorAFMBE } from "actor";
import handlebarsHelpers from "handlebars-helpers";
import { ITEM_CONFIG, ItemAFMBE } from "item";
import { registerSettings } from "settings";
import config from "system-config";

Hooks.once("init", () => {
    CONFIG.AFMBE = config;

    CONFIG.Actor.documentClass = ActorAFMBE;
    for (const { data, sheet, type } of ACTOR_CONFIG) {
        CONFIG.Actor.dataModels[type] = data;
        foundry.documents.collections.Actors.registerSheet("afmbe", sheet, {
            types: [type],
            makeDefault: true,
        });
    }

    CONFIG.Item.documentClass = ItemAFMBE;
    for (const { data, sheet, type } of ITEM_CONFIG) {
        CONFIG.Item.dataModels[type] = data;
        foundry.documents.collections.Items.registerSheet("afmbe", sheet, {
            types: [type],
            makeDefault: true,
        });
    }

    game.afmbe = {
        settings: {} as typeof game.afmbe.settings,
    };

    Handlebars.registerHelper(handlebarsHelpers);
    registerSettings();
});
