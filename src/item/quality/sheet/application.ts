import { CreatureAFMBE } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import { ItemSheetAFMBE, QualityAFMBE, QUALITY_CATEGORIES, QUALITY_TYPES, QualityCategory, QualityType } from "item";
import * as R from "remeda";
import { localize } from "utils";
import { QualitySheetConfiguration, QualitySheetPart, QualitySheetRenderContext } from ".";

class QualitySheetAFMBE<
    TParent extends QualityAFMBE<CreatureAFMBE | null> = QualityAFMBE<CreatureAFMBE | null>,
> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<QualitySheetConfiguration> = {
        classes: ["quality"],
    };

    static PARTS: DocumentSheetPartAFME<QualitySheetPart, QualitySheetRenderContext> = {
        ...super.PARTS,
        sidebar: {
            template: "systems/afmbe-idle/templates/item/quality/sheet-sidebar.hbs",
            prepareContext: this.prepareSidebarContext,
        },
    };

    static async prepareSidebarContext(this: QualitySheetAFMBE, context: QualitySheetRenderContext) {
        context.category = {
            label: localize("afmbe.item.quality.category.label"),
            name: "system.category",
            options: R.map(QUALITY_CATEGORIES, (value): SelectOption<QualityCategory> => {
                return { value, label: localize("afmbe.item.quality.category", value) };
            }),
            selected: this.item.system.category,
        };

        context.level = this.item.system.level;

        context.type = {
            label: localize("afmbe.item.quality.type.label"),
            name: "system.type",
            options: R.map(QUALITY_TYPES, (value): SelectOption<QualityType> => {
                return { value, label: localize("afmbe.item.quality.type", value) };
            }),
            selected: this.item.system.type,
        };
    }
}

export { QualitySheetAFMBE };
