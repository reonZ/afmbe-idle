import type {
    ItemSheetConfiguration,
    ItemSheetPart,
    ItemSheetRenderContext,
    ItemSheetRenderOptions,
    QualityCategory,
    QualityLevel,
    QualityType,
} from "item";

type QualitySheetPart = ItemSheetPart | "sidebar";

type QualitySheetRenderOptions = ItemSheetRenderOptions;

type QualitySheetConfiguration = ItemSheetConfiguration;

type QualitySheetRenderContext = ItemSheetRenderContext & {
    category?: QualitySheetSelect<QualityCategory>;
    level?: QualityLevel;
    type?: QualitySheetSelect<QualityType>;
};

type QualitySheetSelect<T extends string> = {
    label: string;
    name: string;
    options: SelectOption<T>[];
    selected: T;
};

export type {
    QualitySheetConfiguration,
    QualitySheetPart,
    QualitySheetRenderContext,
    QualitySheetRenderOptions,
    QualitySheetSelect,
};
