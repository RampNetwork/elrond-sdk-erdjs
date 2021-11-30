"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerifier = void 0;
const userKeys_1 = require("./userKeys");
/**
 * ed25519 signature verification
 */
class UserVerifier {
    constructor(publicKey) {
        this.publicKey = publicKey;
    }
    static fromAddress(address) {
        let publicKey = new userKeys_1.UserPublicKey(address.pubkey());
        return new UserVerifier(publicKey);
    }
    /**
     * Verify a message's signature.
     * @param message the message to be verified.
     */
    verify(message) {
        return this.publicKey.verify(message.serializeForSigning(this.publicKey.toAddress()), Buffer.from(message.getSignature().hex(), 'hex'));
    }
}
exports.UserVerifier = UserVerifier;
//# sourceMappingURL=userVerifier.js.map