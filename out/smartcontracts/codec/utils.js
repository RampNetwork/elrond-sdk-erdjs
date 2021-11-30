"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discardSuperfluousZeroBytes = exports.discardSuperfluousBytesInTwosComplement = exports.prependByteToBuffer = exports.flipBufferBitsInPlace = exports.getHexMagnitudeOfBigInt = exports.bigIntToBuffer = exports.bufferToBigInt = exports.cloneBuffer = exports.isMsbZero = exports.isMsbOne = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
/**
 * Returns whether the most significant bit of a given byte (within a buffer) is 1.
 * @param buffer the buffer to test
 * @param byteIndex the index of the byte to test
 */
function isMsbOne(buffer, byteIndex = 0) {
    let byte = buffer[byteIndex];
    let bit = byte >> 7;
    let isSet = bit == 1;
    return isSet;
}
exports.isMsbOne = isMsbOne;
/**
 * Returns whether the most significant bit of a given byte (within a buffer) is 0.
 * @param buffer the buffer to test
 * @param byteIndex the index of the byte to test
 */
function isMsbZero(buffer, byteIndex = 0) {
    return !isMsbOne(buffer, byteIndex);
}
exports.isMsbZero = isMsbZero;
function cloneBuffer(buffer) {
    let clone = Buffer.alloc(buffer.length);
    buffer.copy(clone);
    return clone;
}
exports.cloneBuffer = cloneBuffer;
function bufferToBigInt(buffer) {
    // Currently, in JavaScript, this is the feasible way to achieve reliable, arbitrary-size Buffer to BigInt conversion.
    let hex = buffer.toString("hex");
    return new bignumber_js_1.default(`0x${hex}`, 16);
}
exports.bufferToBigInt = bufferToBigInt;
function bigIntToBuffer(value) {
    // Currently, in JavaScript, this is the feasible way to achieve reliable, arbitrary-size BigInt to Buffer conversion.
    let hex = getHexMagnitudeOfBigInt(value);
    return Buffer.from(hex, "hex");
}
exports.bigIntToBuffer = bigIntToBuffer;
function getHexMagnitudeOfBigInt(value) {
    if (!value) {
        return "";
    }
    if (value.isNegative()) {
        value = value.multipliedBy(new bignumber_js_1.default(-1));
    }
    let hex = value.toString(16);
    let padding = "0";
    if (hex.length % 2 == 1) {
        hex = padding + hex;
    }
    return hex;
}
exports.getHexMagnitudeOfBigInt = getHexMagnitudeOfBigInt;
function flipBufferBitsInPlace(buffer) {
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = ~buffer[i];
    }
}
exports.flipBufferBitsInPlace = flipBufferBitsInPlace;
function prependByteToBuffer(buffer, byte) {
    return Buffer.concat([Buffer.from([byte]), buffer]);
}
exports.prependByteToBuffer = prependByteToBuffer;
/**
 * Discards the leading bytes that are merely a padding of the leading sign bit (but keeps the payload).
 * @param buffer A number, represented as a sequence of bytes (big-endian)
 */
function discardSuperfluousBytesInTwosComplement(buffer) {
    let isNegative = isMsbOne(buffer, 0);
    let signPadding = isNegative ? 0xFF : 0x00;
    let index;
    for (index = 0; index < buffer.length - 1; index++) {
        let isPaddingByte = buffer[index] == signPadding;
        let hasSignBitOnNextByte = isMsbOne(buffer, index + 1) === isNegative;
        if (isPaddingByte && hasSignBitOnNextByte) {
            continue;
        }
        break;
    }
    return buffer.slice(index);
}
exports.discardSuperfluousBytesInTwosComplement = discardSuperfluousBytesInTwosComplement;
/**
 * Discards the leading zero bytes.
 * @param buffer A number, represented as a sequence of bytes (big-endian)
 */
function discardSuperfluousZeroBytes(buffer) {
    let index;
    for (index = 0; index < buffer.length && buffer[index] == 0; index++) {
    }
    return buffer.slice(index);
}
exports.discardSuperfluousZeroBytes = discardSuperfluousZeroBytes;
//# sourceMappingURL=utils.js.map