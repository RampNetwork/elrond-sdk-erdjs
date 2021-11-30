"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericalBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
const utils_1 = require("./utils");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const constants_1 = require("./constants");
/**
 * Encodes and decodes "NumericalValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
class NumericalBinaryCodec {
    decodeNested(buffer, type) {
        let offset = 0;
        let length = type.sizeInBytes;
        if (!length) {
            // Size of type is not known: arbitrary-size big integer.
            // Therefore, we must read the length from the header.
            offset = constants_1.SizeOfU32;
            length = buffer.readUInt32BE();
        }
        let payload = buffer.slice(offset, offset + length);
        let result = this.decodeTopLevel(payload, type);
        let decodedLength = length + offset;
        return [result, decodedLength];
    }
    decodeTopLevel(buffer, type) {
        let payload = utils_1.cloneBuffer(buffer);
        let empty = buffer.length == 0;
        if (empty) {
            return new typesystem_1.NumericalValue(type, new bignumber_js_1.default(0));
        }
        let isPositive = !type.withSign || utils_1.isMsbZero(payload);
        if (isPositive) {
            let value = utils_1.bufferToBigInt(payload);
            return new typesystem_1.NumericalValue(type, value);
        }
        // Also see: https://github.com/ElrondNetwork/big-int-util/blob/master/twos-complement/twos2bigint.go
        utils_1.flipBufferBitsInPlace(payload);
        let value = utils_1.bufferToBigInt(payload);
        let negativeValue = value.multipliedBy(new bignumber_js_1.default(-1));
        let negativeValueMinusOne = negativeValue.minus(new bignumber_js_1.default(1));
        return new typesystem_1.NumericalValue(type, negativeValueMinusOne);
    }
    encodeNested(primitive) {
        if (primitive.sizeInBytes) {
            return this.encodeNestedFixedSize(primitive, primitive.sizeInBytes);
        }
        // Size is not known: arbitrary-size big integer. Therefore, we must emit the length (as U32) before the actual payload.
        let buffer = this.encodeTopLevel(primitive);
        let length = Buffer.alloc(constants_1.SizeOfU32);
        length.writeUInt32BE(buffer.length);
        return Buffer.concat([length, buffer]);
    }
    encodeNestedFixedSize(primitive, size) {
        if (primitive.value.isZero()) {
            return Buffer.alloc(size, 0x00);
        }
        if (!primitive.withSign) {
            const buffer = utils_1.bigIntToBuffer(primitive.value);
            const paddingBytes = Buffer.alloc(size - buffer.length, 0x00);
            return Buffer.concat([paddingBytes, buffer]);
        }
        if (primitive.value.isPositive()) {
            let buffer = utils_1.bigIntToBuffer(primitive.value);
            // Fix ambiguity if any
            if (utils_1.isMsbOne(buffer)) {
                buffer = utils_1.prependByteToBuffer(buffer, 0x00);
            }
            const paddingBytes = Buffer.alloc(size - buffer.length, 0x00);
            return Buffer.concat([paddingBytes, buffer]);
        }
        // Negative:
        // Also see: https://github.com/ElrondNetwork/big-int-util/blob/master/twos-complement/bigint2twos.go
        let valuePlusOne = primitive.value.plus(new bignumber_js_1.default(1));
        let buffer = utils_1.bigIntToBuffer(valuePlusOne);
        utils_1.flipBufferBitsInPlace(buffer);
        // Fix ambiguity if any
        if (utils_1.isMsbZero(buffer)) {
            buffer = utils_1.prependByteToBuffer(buffer, 0xFF);
        }
        const paddingBytes = Buffer.alloc(size - buffer.length, 0xff);
        return Buffer.concat([paddingBytes, buffer]);
    }
    encodeTopLevel(primitive) {
        let withSign = primitive.withSign;
        // Nothing or Zero:
        if (primitive.value.isZero()) {
            return Buffer.alloc(0);
        }
        // I don't care about the sign:
        if (!withSign) {
            return utils_1.bigIntToBuffer(primitive.value);
        }
        return this.encodePrimitive(primitive);
    }
    encodePrimitive(primitive) {
        // Positive:
        if (primitive.value.isPositive()) {
            let buffer = utils_1.bigIntToBuffer(primitive.value);
            // Fix ambiguity if any
            if (utils_1.isMsbOne(buffer)) {
                buffer = utils_1.prependByteToBuffer(buffer, 0x00);
            }
            return buffer;
        }
        // Negative:
        // Also see: https://github.com/ElrondNetwork/big-int-util/blob/master/twos-complement/bigint2twos.go
        let valuePlusOne = primitive.value.plus(new bignumber_js_1.default(1));
        let buffer = utils_1.bigIntToBuffer(valuePlusOne);
        utils_1.flipBufferBitsInPlace(buffer);
        // Fix ambiguity if any
        if (utils_1.isMsbZero(buffer)) {
            buffer = utils_1.prependByteToBuffer(buffer, 0xFF);
        }
        return buffer;
    }
}
exports.NumericalBinaryCodec = NumericalBinaryCodec;
//# sourceMappingURL=numerical.js.map