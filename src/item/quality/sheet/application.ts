import { CreatureAFMBE } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import { ItemSheetAFMBE, QualityAFMBE } from "item";
import { configToSelectOptions, localize } from "utils";
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
            options: configToSelectOptions(CONFIG.AFMBE.ITEM.QUALITY.CATEGORY),
            selected: this.item.system.category,
        };

        context.level = this.item.system.level;

        context.type = {
            label: localize("afmbe.item.quality.type.label"),
            name: "system.type",
            options: configToSelectOptions(CONFIG.AFMBE.ITEM.QUALITY.TYPE),
            selected: this.item.system.type,
        };
    }
}

export { QualitySheetAFMBE };
