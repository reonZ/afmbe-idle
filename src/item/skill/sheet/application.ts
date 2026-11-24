import { ApplicationClosingOptions } from "@7h3laughingman/foundry-types/client/applications/_module.mjs";
import { Creature } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import { ItemSheetAFMBE, Skill } from "item";
import * as R from "remeda";
import { localize } from "utils";
import {
    SkillSheetConfiguration,
    SkillSheetParentEntry,
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
        sidebar: {
            template: "systems/afmbe-idle/templates/item/skill/sidebar.hbs",
            prepareContext: this.prepareSidebar,
        },
    };

    static async prepareSidebar(this: SkillSheet, context: SkillSheetRenderContext) {
        context.parents = R.pipe(
            [
                { skill: this.item.parentItem, title: "next" },
                { skill: this.item.rootParentItem, title: "root" },
            ] as const,
            R.filter((entry): entry is { skill: Skill; title: "next" | "root" } => R.isNonNullish(entry.skill)),
            R.uniqueBy(R.prop("skill")),
            R.reverse(),
            R.map(({ skill, title }): SkillSheetParentEntry => {
                return {
                    id: skill.chainId,
                    level: skill.system.level.value,
                    name: skill.name,
                    title,
                };
            }),
        );
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

    _prepareHeaderContext(context: SkillSheetRenderContext) {
        super._prepareHeaderContext(context);
        context.level = {
            label: localize("afmbe.item.skill.level"),
            max: "any",
            min: 1,
            name: "system.level.value",
            value: this.item.system.level.value,
        };
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
