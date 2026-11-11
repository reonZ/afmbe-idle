import type { ApplicationRenderContext } from "@7h3laughingman/foundry-types/client/applications/_types.mjs";

type RollTaskRenderContext = ApplicationRenderContext & {
    categories: RollTaskSelect[];
    private: boolean;
};

type RollTaskSelect = {
    hide: boolean;
    key: string;
    label: string;
    options: { value: string; label: string }[];
    selected: string | undefined;
};

export type { RollTaskRenderContext, RollTaskSelect };
