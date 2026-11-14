import {
    ApplicationClosingOptions,
    ApplicationFormConfiguration,
} from "@7h3laughingman/foundry-types/client/applications/_module.mjs";
import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { ActorAFMBE, Creature } from "actor";
import { ApplicationPartAFMBE } from "handlebars-application";
import { ItemSheetAFMBE } from "item";
import * as R from "remeda";
import { Skill, SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext, SkillSheetRenderOptions } from "..";
import {
    DatabaseCreateOperation,
    DatabaseUpdateOperation,
} from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";

class SkillSheet<TParent extends Skill<Creature | null> = Skill<Creature | null>> extends ItemSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<SkillSheetConfiguration> = {
        classes: ["skill"],
        actions: {
            "add-specialty": this.#addSpecialty,
            "delete-specialty": this.#deleteSpecialty,
        },
    };

    static PARTS = {
        ...super.PARTS,
        details: {
            template: "systems/afmbe-idle/templates/item/skill/details.hbs",
            activateListeners: this.activateDetailsListeners,
            prepareContext: this.prepareDetailsContext,
        },
        level: {
            template: "systems/afmbe-idle/templates/item/skill/level.hbs",
            prepareContext: this.prepareLevelsContext,
        },
    } satisfies ApplicationPartAFMBE<SkillSheetPart, SkillSheetRenderContext>;

    static prepareDetailsContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        const system = this.item.system;

        console.log(this.item.name, system.specialties);

        if (system.isParent) {
            context.specialties = system.specialties;
        } else {
            context.parent = {
                available: R.pipe(
                    this.actor?.itemTypes.skill ?? [],
                    R.filter((skill) => skill.id !== this.item.id && !skill.system.isSpecialty),
                    R.map((skill): FormSelectOption => {
                        return { label: skill.name, value: skill.id };
                    }),
                ),
                selected: system.parentSkill?.id,
            };
        }

        return context;
    }

    static activateDetailsListeners(this: SkillSheet, html: HTMLElement) {
        // const parentSelect = html.querySelector<HTMLSelectElement>(`select[class="parent"]`);
        // parentSelect?.addEventListener(
        //     "change",
        //     () => {
        //         this.#removeParentListener();
        //     },
        //     { capture: true },
        // );
    }

    static prepareHeaderTemplate<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        const parent = this.item.system.parentSkill;
        context.name = parent ? `${parent.name} [${this.item.name}]` : this.item.name;
        return context;
    }

    static prepareLevelsContext<T extends SkillSheetRenderContext>(this: SkillSheet, context: T): T {
        context.level = this.item.system.level.value;
        return context;
    }

    static async #addSpecialty(this: SkillSheet) {
        const specialty = await this.item.system.addSpecialty();
        if (!specialty) return;

        this.render();
        specialty.sheet.render(true);
    }

    // refreshParentSheet() {
    //     this.item.system.parentSkill?.sheet.render();
    // }

    async _onFirstRender(context: object, options: SkillSheetRenderOptions): Promise<void> {
        super._onFirstRender(context, options);
        this.#addParentListener();
    }

    _onClose(options: ApplicationClosingOptions): void {
        super._onClose(options);
        this.#removeParentListener();
    }

    protected _processSubmitData(
        event: SubmitEvent,
        form: HTMLFormElement,
        submitData: Record<string, unknown>,
        options?: Partial<DatabaseCreateOperation<TParent>>,
    ): Promise<void> {}

    //     async _onSubmitForm(formConfig: ApplicationFormConfiguration, event: Event | SubmitEvent): Promise<void> {
    //         await super._onSubmitForm(formConfig, event);
    //         this.refreshParentSheet();
    //     }

    static #deleteSpecialty(this: SkillSheet, _event: PointerEvent, target: HTMLElement) {
        const id = target.closest<HTMLElement>("[data-item-id]")?.dataset.itemId;
        this.actor?.deleteEmbeddedDocuments("Item", [id ?? ""]);
    }

    #addParentListener() {
        const parent = this.item.system.parentSkill;
        if (parent) {
            parent.apps[this.id] = this;
            this.item.apps[parent.sheet.id] = parent.sheet;
        }
    }

    #removeParentListener() {
        const parent = this.item.system.parentSkill;
        if (parent) {
            delete parent.apps[this.id];
            delete this.item.apps[parent.sheet.id];
        }
    }
}

export { SkillSheet };
