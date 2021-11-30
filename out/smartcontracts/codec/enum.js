"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
class EnumBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
    }
    decodeTopLevel(buffer, type) {
        let value = this.binaryCodec.decodeTopLevel(buffer, new typesystem_1.U8Type());
        let enumValue = typesystem_1.EnumValue.fromDiscriminant(type, Number(value.valueOf()));
        return enumValue;
    }
    decodeNested(buffer, type) {
        // Read as plain byte
        let [value, length] = this.binaryCodec.decodeNested(buffer, new typesystem_1.U8Type());
        let enumValue = typesystem_1.EnumValue.fromDiscriminant(type, Number(value.valueOf()));
        return [enumValue, length];
    }
    encodeNested(enumValue) {
        let value = new typesystem_1.U8Value(enumValue.discriminant);
        let buffer = this.binaryCodec.encodeNested(value);
        return buffer;
    }
    encodeTopLevel(enumValue) {
        let value = new typesystem_1.U8Value(enumValue.discriminant);
        let buffer = this.binaryCodec.encodeTopLevel(value);
        return buffer;
    }
}
exports.EnumBinaryCodec = EnumBinaryCodec;
//# sourceMappingURL=enum.js.map