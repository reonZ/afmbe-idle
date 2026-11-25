import { Character, CreatureSheet } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import * as R from "remeda";
import { CharacterSheetConfiguration, CharacterSheetPart, CharacterSheetRenderContext, CharacterSheetSkill } from ".";

abstract class CharacterSheet<TParent extends Character = Character> extends CreatureSheet<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<CharacterSheetConfiguration> = {
        classes: ["character"],
        position: { height: 750 },
    };

    static PARTS: DocumentSheetPartAFME<CharacterSheetPart, CharacterSheetRenderContext> = {
        ...super.PARTS,
        skills: {
            template: "systems/afmbe-idle/templates/actor/character/skills.hbs",
            prepareContext: this.prepareSkillsContext,
        },
    };

    static prepareSkillsContext(this: CharacterSheet, context: CharacterSheetRenderContext) {
        context.skills = R.flatMap(this.actor.itemTypes.skill, (skill) =>
            R.map([skill, ...skill.system.deepSpecialties], (skill): CharacterSheetSkill => {
                return {
                    id: skill.chainId,
                    modifier: skill.system.modifier,
                    name: skill.name,
                    specialty: skill.system.isSpecialty,
                };
            }),
        );
    }
}

export { CharacterSheet };
