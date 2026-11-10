import { Creature } from ".";

function calculateTotalLife(actor: Creature) {
    const { constitution, strength } = actor.system.attributes;
    return (constitution + strength) * 4 + 10;
}

export { calculateTotalLife };
