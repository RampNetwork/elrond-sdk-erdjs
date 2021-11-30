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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decryptor = void 0;
const crypto_1 = __importDefault(require("crypto"));
const errors = __importStar(require("../errors"));
const constants_1 = require("./constants");
class Decryptor {
    static decrypt(data, password) {
        const kdfparams = data.kdfparams;
        const salt = Buffer.from(data.salt, "hex");
        const iv = Buffer.from(data.iv, "hex");
        const ciphertext = Buffer.from(data.ciphertext, "hex");
        const derivedKey = kdfparams.generateDerivedKey(Buffer.from(password), salt);
        const derivedKeyFirstHalf = derivedKey.slice(0, 16);
        const derivedKeySecondHalf = derivedKey.slice(16, 32);
        const computedMAC = crypto_1.default.createHmac(constants_1.DigestAlgorithm, derivedKeySecondHalf).update(ciphertext).digest();
        const actualMAC = data.mac;
        if (computedMAC.toString("hex") !== actualMAC) {
            throw new errors.ErrWallet("MAC mismatch, possibly wrong password");
        }
        const decipher = crypto_1.default.createDecipheriv(data.cipher, derivedKeyFirstHalf, iv);
        return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    }
}
exports.Decryptor = Decryptor;
//# sourceMappingURL=decryptor.js.map