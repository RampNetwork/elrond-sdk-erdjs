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
exports.OptionValueBinaryCodec = void 0;
const errors = __importStar(require("../../errors"));
const typesystem_1 = require("../typesystem");
/**
 * Encodes and decodes "OptionValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
class OptionValueBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
    }
    decodeNested(buffer, type) {
        if (buffer[0] == 0x00) {
            return [typesystem_1.OptionValue.newMissingType(type), 1];
        }
        if (buffer[0] != 0x01) {
            throw new errors.ErrCodec("invalid buffer for optional value");
        }
        let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer.slice(1), type);
        return [typesystem_1.OptionValue.newProvided(decoded), decodedLength + 1];
    }
    decodeTopLevel(buffer, type) {
        if (buffer.length == 0) {
            return new typesystem_1.OptionValue(type);
        }
        if (buffer[0] != 0x01) {
            throw new errors.ErrCodec("invalid buffer for optional value");
        }
        let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer.slice(1), type);
        return new typesystem_1.OptionValue(type, decoded);
    }
    encodeNested(optionValue) {
        if (optionValue.isSet()) {
            return Buffer.concat([Buffer.from([1]), this.binaryCodec.encodeNested(optionValue.getTypedValue())]);
        }
        return Buffer.from([0]);
    }
    encodeTopLevel(optionValue) {
        if (optionValue.isSet()) {
            return Buffer.concat([Buffer.from([1]), this.binaryCodec.encodeNested(optionValue.getTypedValue())]);
        }
        return Buffer.from([]);
    }
}
exports.OptionValueBinaryCodec = OptionValueBinaryCodec;
//# sourceMappingURL=option.js.map