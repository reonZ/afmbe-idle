import type { ApplicationRenderContext } from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import type { CreatureAttribute } from "..";

type RollTaskRenderContext = ApplicationRenderContext & {
    categories: RollTaskCategories;
    private: boolean;
};

type RollTaskCategories = [
    RollTaskSelect<"difficulty", "simple" | "difficult">,
    RollTaskSelect<"attribute", CreatureAttribute>,
];

type TruncatedCategories<T extends unknown[]> = T extends []
    ? []
    : T extends [infer H, ...infer R]
      ? H extends RollTaskCategory
          ? [
                Pick<H, "key" | "label"> & {
                    options: ReadonlyArray<H["options"][number]["value"]>;
                    optionsLocalizer: string | ((value: H["options"][number]["value"]) => string);
                },
                ...TruncatedCategories<R>,
            ]
          : [H, ...TruncatedCategories<R>]
      : T;

type RollTaskTruncatedCategories = Prettify<TruncatedCategories<RollTaskCategories>>;

type RollTaskCategory = RollTaskCategories[number];

type RollTaskSelect<K extends string, V extends string> = {
    disable: boolean;
    hide: boolean;
    key: K;
    label: string;
    options: TupleOf<{ value: V; label: string }>;
    selected: V | undefined;
};

type RollTaskData = {
    disable?: RollTaskCategoryKey[];
    hide?: RollTaskCategoryKey[];
    select?: RollTaskSelected;
};

type RollTaskCategoryKey = RollTaskCategory["key"];

type RollTaskSelected = {
    [k in RollTaskCategoryKey]?: Extract<RollTaskCategory, { key: k }>["options"][number]["value"];
};

export type {
    RollTaskTruncatedCategories,
    RollTaskCategories,
    RollTaskCategory,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelect,
    RollTaskSelected,
    RollTaskCategoryKey,
};
