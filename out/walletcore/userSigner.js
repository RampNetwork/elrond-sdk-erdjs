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
exports.UserSigner = void 0;
const errors = __importStar(require("../errors"));
const signature_1 = require("../signature");
const userKeys_1 = require("./userKeys");
const userWallet_1 = require("./userWallet");
/**
 * ed25519 signer
 */
class UserSigner {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    static fromWallet(keyFileObject, password) {
        let secretKey = userWallet_1.UserWallet.decryptSecretKey(keyFileObject, password);
        return new UserSigner(secretKey);
    }
    static fromPem(text, index = 0) {
        let secretKey = userKeys_1.UserSecretKey.fromPem(text, index);
        return new UserSigner(secretKey);
    }
    /**
     * Signs a message.
     * @param signable the message to be signed (e.g. a {@link Transaction}).
     */
    sign(signable) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.trySign(signable);
            }
            catch (err) {
                throw new errors.ErrSignerCannotSign(err);
            }
        });
    }
    trySign(signable) {
        let signedBy = this.getAddress();
        let bufferToSign = signable.serializeForSigning(signedBy);
        let signatureBuffer = this.secretKey.sign(bufferToSign);
        let signature = new signature_1.Signature(signatureBuffer);
        signable.applySignature(signature, signedBy);
    }
    /**
     * Gets the address of the signer.
     */
    getAddress() {
        return this.secretKey.generatePublicKey().toAddress();
    }
}
exports.UserSigner = UserSigner;
//# sourceMappingURL=userSigner.js.map