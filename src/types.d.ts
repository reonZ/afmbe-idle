import Config from "@7h3laughingman/foundry-types/client/config.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE } from "item";
import config from "./config";

type ConfiguredConfig = Config<
    foundry.documents.AmbientLightDocument<foundry.documents.Scene | null>,
    foundry.documents.ActiveEffect<ActorAFMBE | ItemAFMBE | null>,
    ActorAFMBE,
    foundry.documents.ActorDelta<TokenDocument>,
    foundry.applications.sidebar.tabs.ChatLog,
    foundry.documents.ChatMessage,
    foundry.documents.Combat,
    foundry.documents.Combatant<foundry.documents.Combat | null, TokenDocument | null>,
    foundry.applications.sidebar.tabs.CombatTracker<foundry.documents.Combat | null>,
    foundry.applications.sidebar.tabs.CompendiumDirectory,
    foundry.applications.ui.Hotbar<foundry.documents.Macro>,
    ItemAFMBE,
    foundry.documents.Macro,
    foundry.documents.RegionDocument<foundry.documents.Scene | null>,
    foundry.documents.RegionBehavior<foundry.documents.RegionDocument | null>,
    foundry.documents.TileDocument<foundry.documents.Scene | null>,
    TokenDocument,
    foundry.documents.WallDocument<foundry.documents.Scene | null>,
    foundry.documents.Scene,
    foundry.documents.User,
    foundry.canvas.groups.EffectsCanvasGroup
>;

declare global {
    interface SystemConfig extends ConfiguredConfig {
        AFMBE: typeof config;
    }
    // @ts-ignore
    const CONFIG: SystemConfig;
}
