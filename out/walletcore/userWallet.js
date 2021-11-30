"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWallet = void 0;
const userKeys_1 = require("./userKeys");
const crypto_1 = require("../crypto");
const derivationParams_1 = require("../crypto/derivationParams");
class UserWallet {
    /**
     * Copied from: https://github.com/ElrondNetwork/elrond-core-js/blob/v1.28.0/src/account.js#L76
     * Notes: adjustements (code refactoring, no change in logic), in terms of:
     *  - typing (since this is the TypeScript version)
     *  - error handling (in line with erdjs's error system)
     *  - references to crypto functions
     *  - references to object members
     *
     * Given a password, generates the contents for a file containing the account's secret key,
     * passed through a password-based key derivation function (kdf).
     */
    constructor(secretKey, password, randomness = new crypto_1.Randomness()) {
        const text = Buffer.concat([secretKey.valueOf(), secretKey.generatePublicKey().valueOf()]);
        this.encryptedData = crypto_1.Encryptor.encrypt(text, password, randomness);
        this.publicKey = secretKey.generatePublicKey();
    }
    /**
     * Copied from: https://github.com/ElrondNetwork/elrond-core-js/blob/v1.28.0/src/account.js#L42
     * Notes: adjustements (code refactoring, no change in logic), in terms of:
     *  - typing (since this is the TypeScript version)
     *  - error handling (in line with erdjs's error system)
     *  - references to crypto functions
     *  - references to object members
     *
     * From an encrypted keyfile, given the password, loads the secret key and the public key.
     */
    static decryptSecretKey(keyFileObject, password) {
        const encryptedData = UserWallet.edFromJSON(keyFileObject);
        let text = crypto_1.Decryptor.decrypt(encryptedData, password);
        while (text.length < 32) {
            let zeroPadding = Buffer.from([0x00]);
            text = Buffer.concat([zeroPadding, text]);
        }
        let seed = text.slice(0, 32);
        return new userKeys_1.UserSecretKey(seed);
    }
    static edFromJSON(keyfileObject) {
        return new crypto_1.EncryptedData({
            version: crypto_1.Version,
            id: keyfileObject.id,
            cipher: keyfileObject.crypto.cipher,
            ciphertext: keyfileObject.crypto.ciphertext,
            iv: keyfileObject.crypto.cipherparams.iv,
            kdf: keyfileObject.crypto.kdf,
            kdfparams: new derivationParams_1.ScryptKeyDerivationParams(keyfileObject.crypto.kdfparams.n, keyfileObject.crypto.kdfparams.r, keyfileObject.crypto.kdfparams.p, keyfileObject.crypto.kdfparams.dklen),
            salt: keyfileObject.crypto.kdfparams.salt,
            mac: keyfileObject.crypto.mac,
        });
    }
    /**
     * Converts the encrypted keyfile to plain JavaScript object.
     */
    toJSON() {
        return {
            version: crypto_1.Version,
            id: this.encryptedData.id,
            address: this.publicKey.hex(),
            bech32: this.publicKey.toAddress().toString(),
            crypto: {
                ciphertext: this.encryptedData.ciphertext,
                cipherparams: { iv: this.encryptedData.iv },
                cipher: crypto_1.CipherAlgorithm,
                kdf: crypto_1.KeyDerivationFunction,
                kdfparams: {
                    dklen: this.encryptedData.kdfparams.dklen,
                    salt: this.encryptedData.salt,
                    n: this.encryptedData.kdfparams.n,
                    r: this.encryptedData.kdfparams.r,
                    p: this.encryptedData.kdfparams.p
                },
                mac: this.encryptedData.mac,
            }
        };
    }
}
exports.UserWallet = UserWallet;
//# sourceMappingURL=userWallet.js.map