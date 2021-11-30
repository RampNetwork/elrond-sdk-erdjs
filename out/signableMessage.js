"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignableMessage = exports.MESSAGE_PREFIX = void 0;
const signature_1 = require("./signature");
const address_1 = require("./address");
const createKeccakHash = require("keccak");
exports.MESSAGE_PREFIX = "\x17Elrond Signed Message:\n";
class SignableMessage {
    constructor(init) {
        this.message = Buffer.from([]);
        this.signature = new signature_1.Signature();
        this.version = 1;
        this.signer = "ErdJS";
        this.address = new address_1.Address();
        Object.assign(this, init);
    }
    serializeForSigning() {
        const messageSize = Buffer.from(this.message.length.toString());
        const signableMessage = Buffer.concat([messageSize, this.message]);
        let bytesToHash = Buffer.concat([Buffer.from(exports.MESSAGE_PREFIX), signableMessage]);
        return createKeccakHash("keccak256").update(bytesToHash).digest();
    }
    serializeForSigningRaw() {
        return Buffer.concat([this.getMessageSize(), this.message]);
    }
    getSignature() {
        return this.signature;
    }
    applySignature(signature) {
        this.signature = signature;
    }
    getMessageSize() {
        const messageSize = Buffer.alloc(4);
        messageSize.writeUInt32BE(this.message.length, 0);
        return messageSize;
    }
    toJSON() {
        return {
            address: this.address.bech32(),
            message: "0x" + this.message.toString('hex'),
            signature: "0x" + this.signature.hex(),
            version: this.version,
            signer: this.signer,
        };
    }
}
exports.SignableMessage = SignableMessage;
//# sourceMappingURL=signableMessage.js.map