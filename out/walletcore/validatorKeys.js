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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorPublicKey = exports.ValidatorSecretKey = exports.BLS = exports.VALIDATOR_PUBKEY_LENGTH = exports.VALIDATOR_SECRETKEY_LENGTH = void 0;
const errors = __importStar(require("../errors"));
const utils_1 = require("../utils");
const pem_1 = require("./pem");
const bls = require('@elrondnetwork/bls-wasm');
exports.VALIDATOR_SECRETKEY_LENGTH = 32;
exports.VALIDATOR_PUBKEY_LENGTH = 96;
class BLS {
    static initIfNecessary() {
        return __awaiter(this, void 0, void 0, function* () {
            if (BLS.isInitialized) {
                return;
            }
            yield bls.init(bls.BLS12_381);
            BLS.isInitialized = true;
        });
    }
    static guardInitialized() {
        if (!BLS.isInitialized) {
            throw new errors.ErrInvariantFailed("BLS modules are not initalized. Make sure that 'await BLS.initIfNecessary()' is called correctly.");
        }
    }
}
exports.BLS = BLS;
BLS.isInitialized = false;
class ValidatorSecretKey {
    constructor(buffer) {
        BLS.guardInitialized();
        utils_1.guardLength(buffer, exports.VALIDATOR_SECRETKEY_LENGTH);
        this.secretKey = new bls.SecretKey();
        this.secretKey.setLittleEndian(Uint8Array.from(buffer));
        this.publicKey = this.secretKey.getPublicKey();
    }
    static fromPem(text, index = 0) {
        return pem_1.parseValidatorKey(text, index);
    }
    generatePublicKey() {
        let buffer = Buffer.from(this.publicKey.serialize());
        return new ValidatorPublicKey(buffer);
    }
    sign(message) {
        let signatureObject = this.secretKey.sign(message);
        let signature = Buffer.from(signatureObject.serialize());
        return signature;
    }
    hex() {
        return this.valueOf().toString("hex");
    }
    valueOf() {
        return Buffer.from(this.secretKey.serialize());
    }
}
exports.ValidatorSecretKey = ValidatorSecretKey;
class ValidatorPublicKey {
    constructor(buffer) {
        utils_1.guardLength(buffer, exports.VALIDATOR_PUBKEY_LENGTH);
        this.buffer = buffer;
    }
    hex() {
        return this.buffer.toString("hex");
    }
    valueOf() {
        return this.buffer;
    }
}
exports.ValidatorPublicKey = ValidatorPublicKey;
//# sourceMappingURL=validatorKeys.js.map