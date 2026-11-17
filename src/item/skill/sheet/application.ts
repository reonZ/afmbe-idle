import { ApplicationClosingOptions } from "@7h3laughingman/foundry-types/client/applications/_module.mjs";
import { Creature } from "actor";
import { ApplicationPartAFMBE } from "handlebars-application";
import { ItemSheetAFMBE } from "item";
import { Skill, SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext, SkillSheetRenderOptions } from "..";
import { localize } from "utils";
import { HandlebarsRenderOptions } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";

class SkillSheet<TParent extends Skill<Creature | null> = Skill<Creature | null>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<SkillSheetConfiguration> = {
        classes: ["skill"],
        actions: {
            "add-specialty": this.#addSpecialty,
        },
    };

    static PARTS = {
        ...super.PARTS,
        header: {
            template: "systems/afmbe-idle/templates/item/skill/header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
        sidebar: {
            template: "systems/afmbe-idle/templates/item/skill/sidebar.hbs",
        },
    } satisfies ApplicationPartAFMBE<SkillSheetPart, SkillSheetRenderContext>;

    static async prepareHeaderContext(
        this: SkillSheet,
        context: SkillSheetRenderContext,
        options: HandlebarsRenderOptions,
    ) {
        await super.prepareHeaderContext(context, options);
        context.level = this.item.system.level.value;
    }

    static async #addSpecialty(this: SkillSheet) {
        const specialty = await this.item.system.addSpecialty();
        if (!specialty) return;

        this.render();
        specialty.sheet.render(true);
    }

    get title() {
        const { system, id, name } = this.item;
        const prefix = system.isSpecialty ? localize("item.skill.specialty.name") : _loc("TYPES.Item.skill");
        return `${prefix}: ${name || id}`;
    }

    refreshParentSheet() {
        this.item.system.parentSkill?.sheet.render();
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
