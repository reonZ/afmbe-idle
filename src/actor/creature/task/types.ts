import type {
    ApplicationConfiguration,
    ApplicationRenderContext,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import type { Creature, CreatureAttribute } from "..";

type RollTaskRenderContext = ApplicationRenderContext & {
    selects: RollTaskSelects;
    private: boolean;
};

type RollTaskSelects = [
    RollTaskSelect<"difficulty", "simple" | "difficult">,
    RollTaskSelect<"attribute", CreatureAttribute>,
    RollTaskSelect<"skill", string>,
];

type TruncatedSelects<T extends unknown[]> = T extends []
    ? []
    : T extends [infer H, ...infer R]
      ? H extends RollTaskSelects[number]
          ? [Pick<H, "key" | "label" | "options"> & { blank?: boolean }, ...TruncatedSelects<R>]
          : [H, ...TruncatedSelects<R>]
      : T;

type RollTaskTruncatedSelects = Prettify<TruncatedSelects<RollTaskSelects>>;

type RollTaskSelect<K extends string, V extends string> = {
    blank: string;
    disable: boolean;
    hide: boolean;
    key: K;
    label: string;
    options: { value: V; label: string }[];
    selected: V | undefined;
};

type RollTaskModifier = {
    id: string;
    label: string;
    value: number;
};

type RollTaskData = {
    disable?: RollTaskSelectKey[];
    hide?: RollTaskSelectKey[];
    modifiers?: string[];
    select?: RollTaskSelected;
    title?: string;
};

type RollTaskApplicationConfiguration = ApplicationConfiguration & {
    actor: Creature;
    data: RollTaskData;
    event?: PointerEvent;
};

type RollTaskSelectKey = RollTaskSelects[number]["key"];

type RollTaskSelected = {
    [k in RollTaskSelectKey]?: Extract<RollTaskSelects[number], { key: k }>["options"][number]["value"];
};

export type {
    RollTaskApplicationConfiguration,
    RollTaskData,
    RollTaskModifier,
    RollTaskRenderContext,
    RollTaskSelect,
    RollTaskSelected,
    RollTaskSelectKey,
    RollTaskSelects,
    RollTaskTruncatedSelects,
};
