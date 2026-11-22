import { Character, CreatureSheet } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import * as R from "remeda";
import { CharacterSheetConfiguration, CharacterSheetPart, CharacterSheetRenderContext } from ".";

abstract class CharacterSheet<TParent extends Character = Character> extends CreatureSheet<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<CharacterSheetConfiguration> = {
        classes: ["character"],
        position: { width: 750 },
    };

    static PARTS: DocumentSheetPartAFME<CharacterSheetPart, CharacterSheetRenderContext> = {
        ...super.PARTS,
        skills: {
            template: "systems/afmbe-idle/templates/actor/character/skills.hbs",
            prepareContext: this.prepareSkillsContext,
        },
    };

    static prepareSkillsContext(this: CharacterSheet, context: CharacterSheetRenderContext) {
        context.skills = R.flatMap(this.actor.itemTypes.skill, (skill) => [skill, ...skill.system.deepSpecialties]);
    }
}

export { CharacterSheet };
