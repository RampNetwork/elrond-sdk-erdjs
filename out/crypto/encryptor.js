"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryptor = void 0;
const crypto_1 = __importDefault(require("crypto"));
const randomness_1 = require("./randomness");
const derivationParams_1 = require("./derivationParams");
const constants_1 = require("./constants");
const encryptedData_1 = require("./encryptedData");
class Encryptor {
    static encrypt(data, password, randomness = new randomness_1.Randomness()) {
        const kdParams = new derivationParams_1.ScryptKeyDerivationParams();
        const derivedKey = kdParams.generateDerivedKey(Buffer.from(password), randomness.salt);
        const derivedKeyFirstHalf = derivedKey.slice(0, 16);
        const derivedKeySecondHalf = derivedKey.slice(16, 32);
        const cipher = crypto_1.default.createCipheriv(constants_1.CipherAlgorithm, derivedKeyFirstHalf, randomness.iv);
        const ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
        const mac = crypto_1.default.createHmac(constants_1.DigestAlgorithm, derivedKeySecondHalf).update(ciphertext).digest();
        return new encryptedData_1.EncryptedData({
            version: constants_1.Version,
            id: randomness.id,
            ciphertext: ciphertext.toString('hex'),
            iv: randomness.iv.toString('hex'),
            cipher: constants_1.CipherAlgorithm,
            kdf: constants_1.KeyDerivationFunction,
            kdfparams: kdParams,
            mac: mac.toString('hex'),
            salt: randomness.salt.toString('hex')
        });
    }
}
exports.Encryptor = Encryptor;
//# sourceMappingURL=encryptor.js.map