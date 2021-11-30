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
exports.BooleanBinaryCodec = void 0;
const errors = __importStar(require("../../errors"));
const typesystem_1 = require("../typesystem");
/**
 * Encodes and decodes "BooleanValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
class BooleanBinaryCodec {
    decodeNested(buffer) {
        // We don't check the size of the buffer, we just read the first byte.
        let byte = buffer.readUInt8();
        return [new typesystem_1.BooleanValue(byte == BooleanBinaryCodec.TRUE), 1];
    }
    decodeTopLevel(buffer) {
        if (buffer.length > 1) {
            throw new errors.ErrInvalidArgument("buffer", buffer, "should be a buffer of size <= 1");
        }
        let firstByte = buffer[0];
        return new typesystem_1.BooleanValue(firstByte == BooleanBinaryCodec.TRUE);
    }
    encodeNested(primitive) {
        if (primitive.isTrue()) {
            return Buffer.from([BooleanBinaryCodec.TRUE]);
        }
        return Buffer.from([BooleanBinaryCodec.FALSE]);
    }
    encodeTopLevel(primitive) {
        if (primitive.isTrue()) {
            return Buffer.from([BooleanBinaryCodec.TRUE]);
        }
        return Buffer.from([]);
    }
}
exports.BooleanBinaryCodec = BooleanBinaryCodec;
BooleanBinaryCodec.TRUE = 0x01;
BooleanBinaryCodec.FALSE = 0x00;
//# sourceMappingURL=boolean.js.map