"use strict";
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
exports.NullSigner = void 0;
const signature_1 = require("./signature");
/**
 * Null-object pattern: a null Signer, which does nothing.
 *
 * Useful for contract interaction flows with query-only purposes.
 */
class NullSigner {
    /**
     * Creates a NullSigner.
     */
    constructor(address) {
        this.address = address;
    }
    getAddress() {
        return this.address;
    }
    /**
     * Applies a mock signature.
     */
    sign(signable) {
        return __awaiter(this, void 0, void 0, function* () {
            signable.applySignature(new signature_1.Signature("0".repeat(128)), this.address);
        });
    }
}
exports.NullSigner = NullSigner;
//# sourceMappingURL=nullSigner.js.map