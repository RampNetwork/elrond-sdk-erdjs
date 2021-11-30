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
exports.Signature = void 0;
const errors = __importStar(require("./errors"));
const SIGNATURE_LENGTH = 64;
/**
 * Signature, as an immutable object.
 */
class Signature {
    constructor(value) {
        this.valueHex = "";
        if (!value) {
            return;
        }
        if (typeof value === "string") {
            return Signature.fromHex(value);
        }
        if (value instanceof Buffer) {
            return Signature.fromBuffer(value);
        }
    }
    static empty() {
        return new Signature();
    }
    static fromHex(value) {
        if (value.startsWith("0x")) {
            value = value.slice(2);
        }
        if (!Signature.isValidHex(value)) {
            throw new errors.ErrSignatureCannotCreate(value);
        }
        return Signature.fromValidHex(value);
    }
    static isValidHex(value) {
        return Buffer.from(value, "hex").length == SIGNATURE_LENGTH;
    }
    static fromValidHex(value) {
        let result = new Signature();
        result.valueHex = value;
        return result;
    }
    static fromBuffer(buffer) {
        if (buffer.length != SIGNATURE_LENGTH) {
            throw new errors.ErrSignatureCannotCreate(buffer);
        }
        return Signature.fromValidHex(buffer.toString("hex"));
    }
    hex() {
        this.assertNotEmpty();
        return this.valueHex;
    }
    isEmpty() {
        return !this.valueHex;
    }
    assertNotEmpty() {
        if (this.isEmpty()) {
            throw new errors.ErrSignatureEmpty();
        }
    }
}
exports.Signature = Signature;
//# sourceMappingURL=signature.js.map