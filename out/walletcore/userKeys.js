"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPublicKey = exports.UserSecretKey = exports.USER_PUBKEY_LENGTH = exports.USER_SEED_LENGTH = void 0;
const tweetnacl = __importStar(require("tweetnacl"));
const address_1 = require("../address");
const utils_1 = require("../utils");
const pem_1 = require("./pem");
const logger_1 = require("../logger");
exports.USER_SEED_LENGTH = 32;
exports.USER_PUBKEY_LENGTH = 32;
class UserSecretKey {
    constructor(buffer) {
        utils_1.guardLength(buffer, exports.USER_SEED_LENGTH);
        this.buffer = buffer;
    }
    static fromString(value) {
        utils_1.guardLength(value, exports.USER_SEED_LENGTH * 2);
        let buffer = Buffer.from(value, "hex");
        return new UserSecretKey(buffer);
    }
    static fromPem(text, index = 0) {
        return pem_1.parseUserKey(text, index);
    }
    generatePublicKey() {
        let keyPair = tweetnacl.sign.keyPair.fromSeed(new Uint8Array(this.buffer));
        let buffer = Buffer.from(keyPair.publicKey);
        return new UserPublicKey(buffer);
    }
    sign(message) {
        let pair = tweetnacl.sign.keyPair.fromSeed(new Uint8Array(this.buffer));
        let signingKey = pair.secretKey;
        let signature = tweetnacl.sign(new Uint8Array(message), signingKey);
        // "tweetnacl.sign()" returns the concatenated [signature, message], therfore we remove the appended message:
        signature = signature.slice(0, signature.length - message.length);
        return Buffer.from(signature);
    }
    hex() {
        return this.buffer.toString("hex");
    }
    valueOf() {
        return this.buffer;
    }
}
exports.UserSecretKey = UserSecretKey;
class UserPublicKey {
    constructor(buffer) {
        utils_1.guardLength(buffer, exports.USER_PUBKEY_LENGTH);
        this.buffer = buffer;
    }
    verify(message, signature) {
        try {
            const unopenedMessage = Buffer.concat([signature, message]);
            const unsignedMessage = tweetnacl.sign.open(unopenedMessage, this.buffer);
            return unsignedMessage != null;
        }
        catch (err) {
            logger_1.Logger.error(err);
            return false;
        }
    }
    hex() {
        return this.buffer.toString("hex");
    }
    toAddress() {
        return new address_1.Address(this.buffer);
    }
    valueOf() {
        return this.buffer;
    }
}
exports.UserPublicKey = UserPublicKey;
//# sourceMappingURL=userKeys.js.map