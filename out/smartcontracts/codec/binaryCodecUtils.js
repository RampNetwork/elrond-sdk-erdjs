"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBigNumber = exports.decodeString = exports.decodeBool = exports.decodeUnsignedNumber = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const typesystem_1 = require("../typesystem");
const binary_1 = require("./binary");
const Codec = new binary_1.BinaryCodec();
function decodeUnsignedNumber(buffer) {
    let value = Codec.decodeTopLevel(buffer, new typesystem_1.BigUIntType());
    let raw = Number(value.valueOf());
    return raw;
}
exports.decodeUnsignedNumber = decodeUnsignedNumber;
function decodeBool(buffer) {
    let value = Codec.decodeTopLevel(buffer, new typesystem_1.BooleanType());
    let raw = Boolean(value.valueOf());
    return raw;
}
exports.decodeBool = decodeBool;
function decodeString(buffer) {
    let value = Codec.decodeTopLevel(buffer, new typesystem_1.BytesType());
    let raw = String(value.valueOf());
    return raw;
}
exports.decodeString = decodeString;
function decodeBigNumber(buffer) {
    let value = Codec.decodeTopLevel(buffer, new typesystem_1.BigUIntType());
    let raw = new bignumber_js_1.default(value.valueOf());
    return raw;
}
exports.decodeBigNumber = decodeBigNumber;
//# sourceMappingURL=binaryCodecUtils.js.map