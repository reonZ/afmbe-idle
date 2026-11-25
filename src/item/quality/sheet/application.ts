import { Creature } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import { ItemSheetAFMBE, Quality, QUALITY_CATEGORIES, QUALITY_TYPES } from "item";
import * as R from "remeda";
import { localize } from "utils";
import { QualitySheetConfiguration, QualitySheetPart, QualitySheetRenderContext, QualitySheetSelect } from ".";

class QualitySheet<
    TParent extends Quality<Creature | null> = Quality<Creature | null>,
> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<QualitySheetConfiguration> = {
        classes: ["quality"],
    };

    static PARTS: DocumentSheetPartAFME<QualitySheetPart, QualitySheetRenderContext> = {
        ...super.PARTS,
        header: {
            template: "systems/afmbe-idle/templates/item/quality/sheet-header.hbs",
            prepareContext: this.prepareHeader,
        },
        sidebar: {
            template: "systems/afmbe-idle/templates/item/quality/sheet-sidebar.hbs",
            prepareContext: this.prepareSidebar,
        },
    };

    static async prepareHeader(this: QualitySheet, context: QualitySheetRenderContext) {
        context.level = this.item.system.level;
    }

    static async prepareSidebar(this: QualitySheet, context: QualitySheetRenderContext) {
        context.category = this.#createSidebarSelect("category", QUALITY_CATEGORIES);
        context.level = this.item.system.level;
        context.type = this.#createSidebarSelect("type", QUALITY_TYPES);
    }

    #createSidebarSelect<N extends "category" | "type", T extends string = this["item"]["system"][N]>(
        name: N,
        list: ReadonlyArray<T>,
    ): QualitySheetSelect<T> {
        return {
            label: localize("afmbe.item.quality", name, "label"),
            name: `system.${name}`,
            options: R.map(list, (value): SelectOption<T> => {
                return { value, label: localize("afmbe.item.quality", name, value) };
            }),
            selected: this.item.system[name] as any,
        };
    }
}

export { QualitySheet };
