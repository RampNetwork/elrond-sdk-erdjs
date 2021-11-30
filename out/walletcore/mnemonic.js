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
exports.Mnemonic = void 0;
const errors = __importStar(require("../errors"));
const bip39_1 = require("bip39");
const userKeys_1 = require("./userKeys");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const MNEMONIC_STRENGTH = 256;
const BIP44_DERIVATION_PREFIX = "m/44'/508'/0'/0'";
class Mnemonic {
    constructor(text) {
        this.text = text;
    }
    static generate() {
        let text = bip39_1.generateMnemonic(MNEMONIC_STRENGTH);
        return new Mnemonic(text);
    }
    static fromString(text) {
        text = text.trim();
        Mnemonic.assertTextIsValid(text);
        return new Mnemonic(text);
    }
    static assertTextIsValid(text) {
        let isValid = bip39_1.validateMnemonic(text);
        if (!isValid) {
            throw new errors.ErrWrongMnemonic();
        }
    }
    deriveKey(addressIndex = 0, password = "") {
        let seed = bip39_1.mnemonicToSeedSync(this.text, password);
        let derivationPath = `${BIP44_DERIVATION_PREFIX}/${addressIndex}'`;
        let derivationResult = ed25519_hd_key_1.derivePath(derivationPath, seed.toString("hex"));
        let key = derivationResult.key;
        return new userKeys_1.UserSecretKey(key);
    }
    getWords() {
        return this.text.split(" ");
    }
    toString() {
        return this.text;
    }
}
exports.Mnemonic = Mnemonic;
//# sourceMappingURL=mnemonic.js.map