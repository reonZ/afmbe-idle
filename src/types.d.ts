import type Config from "@7h3laughingman/foundry-types/client/config.mjs";
import type { ActorAFMBE } from "actor";
import type { ChatMessageAFMBE } from "chat-message";
import type { ItemAFMBE } from "item";
import type { SceneAFMBE, TokenAFMBE, TokenDocumentAFMBE, UserAFMBE } from "misc";
import type config from "./system-config";
import type { TaskRoll } from "roll";
import type { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { ActiveEffectAFMBE } from "active-effect";

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
    type DocumentTypeMap = {
        ActiveEffect: typeof ActiveEffectAFMBE;
        Actor: typeof ActorAFMBE;
        ActorDelta: typeof foundry.documents.ActorDelta;
        Adventure: typeof foundry.documents.Adventure;
        AmbientLight: typeof foundry.documents.AmbientLightDocument;
        AmbientSound: typeof foundry.documents.AmbientSoundDocument;
        Card: typeof foundry.documents.Card;
        Cards: typeof foundry.documents.Cards;
        ChatMessage: typeof ChatMessageAFMBE;
        Combat: typeof foundry.documents.Combat;
        Combatant: typeof foundry.documents.Combatant;
        CombatantGroup: typeof foundry.documents.CombatantGroup;
        Drawing: typeof foundry.documents.DrawingDocument;
        FogExploration: typeof foundry.documents.FogExploration;
        Folder: typeof foundry.documents.Folder;
        Item: typeof ItemAFMBE;
        JournalEntry: typeof foundry.documents.JournalEntry;
        JournalEntryCategory: typeof foundry.documents.JournalEntryCategory;
        JournalEntryPage: typeof foundry.documents.JournalEntryPage;
        Level: typeof foundry.documents.Level;
        Macro: typeof foundry.documents.Macro;
        Note: typeof foundry.documents.NoteDocument;
        Playlist: typeof foundry.documents.Playlist;
        PlaylistSound: typeof foundry.documents.PlaylistSound;
        Region: typeof foundry.documents.RegionDocument;
        RegionBehavior: typeof foundry.documents.RegionBehavior;
        RollTable: typeof foundry.documents.RollTable;
        Scene: typeof SceneAFMBE;
        Setting: typeof foundry.documents.Setting;
        TableResult: typeof foundry.documents.TableResult;
        Tile: typeof foundry.documents.TileDocument;
        Token: typeof TokenDocumentAFMBE;
        User: typeof UserAFMBE;
        Wall: typeof foundry.documents.WallDocument;
    };
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

    type SelectOption<T extends string = string> = Omit<FormSelectOption, "value"> & { value: T };
}
