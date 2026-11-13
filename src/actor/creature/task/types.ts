import type {
    ApplicationConfiguration,
    ApplicationRenderContext,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import type { Creature, CreatureAttributeType } from "..";
import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";

type RollTaskRenderContext = ApplicationRenderContext & {
    modifiers: Record<string, { id: string; label: string; value: string }>;
    selects: RollTaskSelects;
    private: boolean;
};

type RollTaskSelects = [
    RollTaskSelect<"difficulty", "simple" | "difficult">,
    RollTaskSelect<"attribute", CreatureAttributeType>,
    RollTaskSelect<"skill", string>,
];

type TruncatedSelects<T extends unknown[]> = T extends []
    ? []
    : T extends [infer H, ...infer R]
      ? H extends RollTaskSelects[number]
          ? [Pick<H, "key" | "label" | "options"> & { blank?: boolean }, ...TruncatedSelects<R>]
          : [H, ...TruncatedSelects<R>]
      : T;

type RollTaskTruncatedSelects = TruncatedSelects<RollTaskSelects>;

type RollTaskSelect<K extends string, V extends string> = {
    blank: string;
    disable: boolean;
    hide: boolean;
    key: K;
    label: string;
    options: RollTaskSelectOption<V>[];
    selected: V | undefined;
};

type RollTaskSelectOption<V extends string = string> = Omit<FormSelectOption, "value"> & { value: V };

type RollTaskModifier = {
    id: string;
    label: string;
    value: number;
};

type RollTaskData = {
    disable?: RollTaskSelectKey[];
    hide?: RollTaskSelectKey[];
    modifiers?: string[];
    mode?: "private" | "public";
    select?: RollTaskSelected;
    title?: string;
};

type RollTaskApplicationConfiguration = ApplicationConfiguration & {
    actor: Creature;
    data: RollTaskData;
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
