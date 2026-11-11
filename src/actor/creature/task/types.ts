import type {
    ApplicationConfiguration,
    ApplicationRenderContext,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import type { Creature, CreatureAttribute } from "..";

type RollTaskRenderContext = ApplicationRenderContext & {
    categories: RollTaskCategories;
    private: boolean;
};

type RollTaskCategories = [
    RollTaskSelect<"difficulty", "simple" | "difficult">,
    RollTaskSelect<"attribute", CreatureAttribute>,
    RollTaskSelect<"skill", string>,
];

type TruncatedCategories<T extends unknown[]> = T extends []
    ? []
    : T extends [infer H, ...infer R]
      ? H extends RollTaskCategory
          ? [Pick<H, "key" | "label" | "options"> & { blank?: boolean }, ...TruncatedCategories<R>]
          : [H, ...TruncatedCategories<R>]
      : T;

type RollTaskTruncatedCategories = Prettify<TruncatedCategories<RollTaskCategories>>;

type RollTaskCategory = RollTaskCategories[number];

type RollTaskSelect<K extends string, V extends string> = {
    blank: string;
    disable: boolean;
    hide: boolean;
    key: K;
    label: string;
    options: { value: V; label: string }[];
    selected: V | undefined;
};

type RollTaskData = {
    disable?: RollTaskCategoryKey[];
    hide?: RollTaskCategoryKey[];
    select?: RollTaskSelected;
    title?: string;
};

type RollTaskApplicationConfiguration = ApplicationConfiguration & {
    actor: Creature;
    data: RollTaskData;
    event?: PointerEvent;
};

type RollTaskCategoryKey = RollTaskCategory["key"];

type RollTaskSelected = {
    [k in RollTaskCategoryKey]?: Extract<RollTaskCategory, { key: k }>["options"][number]["value"];
};

export type {
    RollTaskApplicationConfiguration,
    RollTaskCategories,
    RollTaskCategory,
    RollTaskCategoryKey,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelect,
    RollTaskSelected,
    RollTaskTruncatedCategories,
};
