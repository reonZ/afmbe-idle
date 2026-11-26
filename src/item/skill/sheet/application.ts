import { ApplicationClosingOptions } from "@7h3laughingman/foundry-types/client/applications/_module.mjs";
import { Creature } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import { ItemSheetAFMBE, Skill } from "item";
import * as R from "remeda";
import { localize } from "utils";
import {
    SkillSheetConfiguration,
    SkillSheetPart,
    SkillSheetRenderContext,
    SkillSheetRenderOptions,
    SkillSheetSkillEntry,
} from ".";

class SkillSheet<TParent extends Skill<Creature | null> = Skill<Creature | null>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<SkillSheetConfiguration> = {
        classes: ["skill"],
        actions: {
            "add-specialty": this.#addSpecialty,
        },
    };

    static PARTS: DocumentSheetPartAFME<SkillSheetPart, SkillSheetRenderContext> = {
        ...super.PARTS,
        header: {
            template: "systems/afmbe-idle/templates/item/skill/sheet-header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
        sidebar: {
            template: "systems/afmbe-idle/templates/item/skill/sheet-sidebar.hbs",
            prepareContext: this.prepareSidebarContext,
            scrollable: [".list.specialties"],
        },
    };

    static async prepareHeaderContext(this: SkillSheet, context: SkillSheetRenderContext) {
        context.level = this.item.system.level.value;
    }

    static async prepareSidebarContext(this: SkillSheet, context: SkillSheetRenderContext) {
        const parent = this.item.rootParentItem;

        if (parent) {
            context.parent = { id: parent.id, level: parent.system.level.value, name: parent.name };
        }

        context.specialties = R.map(this.item.system.deepSpecialties, (skill): SkillSheetSkillEntry => {
            return {
                id: skill.chainId,
                level: skill.system.level.value,
                name: skill.name,
            };
        });
    }

    static async #addSpecialty(this: SkillSheet) {
        const specialty = await this.item.system.addSpecialty();
        if (!specialty) return;

        this.render();
        specialty.sheet.render(true);
    }

    get title() {
        const { system, id, name } = this.item;
        const prefix = localize(system.isSpecialty ? "afmbe.item.skill.specialty.name" : "TYPES.Item.skill");
        return `${prefix}: ${name || id}`;
    }

    async _onFirstRender(context: object, options: SkillSheetRenderOptions): Promise<void> {
        await super._onFirstRender(context, options);

        const rootParent = this.item.rootParentItem;
        if (rootParent) {
            rootParent.apps[this.id] = this;
        }
    }

    _onClose(options: ApplicationClosingOptions): void {
        super._onClose(options);
        delete this.item.rootParentItem?.apps[this.id];
    }
}

export { SkillSheet };
