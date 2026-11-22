import type Config from "@7h3laughingman/foundry-types/client/config.mjs";
import type { ActorAFMBE } from "actor";
import type { ChatMessageAFMBE } from "chat-message";
import type { ItemAFMBE } from "item";
import type { SceneAFMBE, TokenAFMBE, TokenDocumentAFMBE, UserAFMBE } from "misc";
import type config from "./system-config";
import type { TaskRoll } from "task";

type ConfiguredConfig = Config<
    AmbientLightDocument<SceneAFMBE | null>,
    ActiveEffect<ActorAFMBE | ItemAFMBE | null>,
    ActorAFMBE,
    ActorDelta<TokenDocumentAFMBE>,
    foundry.applications.sidebar.tabs.ChatLog,
    ChatMessageAFMBE,
    Combat,
    Combatant<Combat | null, TokenDocumentAFMBE | null>,
    foundry.applications.sidebar.tabs.CombatTracker<foundry.documents.Combat | null>,
    foundry.applications.sidebar.tabs.CompendiumDirectory,
    foundry.applications.ui.Hotbar<foundry.documents.Macro>,
    ItemAFMBE,
    Macro,
    RegionDocument<SceneAFMBE | null>,
    RegionBehavior<RegionDocument | null>,
    TileDocument<SceneAFMBE | null>,
    TokenDocumentAFMBE,
    WallDocument<SceneAFMBE | null>,
    SceneAFMBE,
    UserAFMBE,
    foundry.canvas.groups.EffectsCanvasGroup
>;

type GameAFMBE = foundry.Game<
    ActorAFMBE<null>,
    foundry.documents.collections.Actors<ActorAFMBE<null>>,
    ChatMessageAFMBE,
    Combat,
    ItemAFMBE<null>,
    Macro,
    SceneAFMBE,
    UserAFMBE
> & {
    afmbe: {
        settings: {
            metric: boolean;
        };
        TaskRoll: typeof TaskRoll;
    };
};

type CanvasAFMBE = foundry.canvas.Canvas<
    SceneAFMBE,
    foundry.canvas.placeables.AmbientLight<foundry.documents.AmbientLightDocument<SceneAFMBE>>,
    TokenAFMBE,
    foundry.canvas.groups.EffectsCanvasGroup,
    foundry.canvas.placeables.Region<RegionDocument<SceneAFMBE>>
>;

declare global {
    interface ConfigAFMBE extends ConfiguredConfig {
        AFMBE: typeof config;
    }

    // @ts-ignore
    const CONFIG: ConfigAFMBE;
    // @ts-ignore
    const canvas: CanvasAFMBE;
    // @ts-ignore
    const game: GameAFMBE;

    type Prettify<T> = { [K in keyof T]: T[K] } & {};

    type ValueAndMax = { max: number; value: number };
    type ValueAndTotal = { total: number; value: number };

    type TupleOf<T> = [T, ...T[]];

    type WithNonNullable<T extends Record<string, unknown>, K extends keyof T> = Omit<T, K> & {
        [k in K]: Exclude<T[K], null | undefined>;
    };
}
