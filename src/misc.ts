import type { ActorAFMBE } from "actor";

class SceneAFMBE extends Scene {}

class TokenDocumentAFMBE extends TokenDocument<SceneAFMBE> {}

interface TokenDocumentAFMBE {
    get actor(): ActorAFMBE<this> | null;
}

class TokenAFMBE extends foundry.canvas.placeables.Token<TokenDocumentAFMBE> {}

class UserAFMBE extends User {}

export { SceneAFMBE, TokenAFMBE, TokenDocumentAFMBE, UserAFMBE };
