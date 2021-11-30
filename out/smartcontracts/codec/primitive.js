"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
const address_1 = require("./address");
const boolean_1 = require("./boolean");
const numerical_1 = require("./numerical");
const h256_1 = require("./h256");
const bytes_1 = require("./bytes");
const tokenIdentifier_1 = require("./tokenIdentifier");
class PrimitiveBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
        this.booleanCodec = new boolean_1.BooleanBinaryCodec();
        this.numericalCodec = new numerical_1.NumericalBinaryCodec();
        this.addressCodec = new address_1.AddressBinaryCodec();
        this.h256Codec = new h256_1.H256BinaryCodec();
        this.bytesCodec = new bytes_1.BytesBinaryCodec();
        this.tokenIdentifierCodec = new tokenIdentifier_1.TokenIdentifierCodec();
    }
    decodeNested(buffer, type) {
        return typesystem_1.onPrimitiveTypeSelect(type, {
            onBoolean: () => this.booleanCodec.decodeNested(buffer),
            onNumerical: () => this.numericalCodec.decodeNested(buffer, type),
            onAddress: () => this.addressCodec.decodeNested(buffer),
            onBytes: () => this.bytesCodec.decodeNested(buffer),
            onH256: () => this.h256Codec.decodeNested(buffer),
            onTokenIndetifier: () => this.tokenIdentifierCodec.decodeNested(buffer),
        });
    }
    decodeTopLevel(buffer, type) {
        return typesystem_1.onPrimitiveTypeSelect(type, {
            onBoolean: () => this.booleanCodec.decodeTopLevel(buffer),
            onNumerical: () => this.numericalCodec.decodeTopLevel(buffer, type),
            onAddress: () => this.addressCodec.decodeTopLevel(buffer),
            onBytes: () => this.bytesCodec.decodeTopLevel(buffer),
            onH256: () => this.h256Codec.decodeTopLevel(buffer),
            onTokenIndetifier: () => this.tokenIdentifierCodec.decodeTopLevel(buffer),
        });
    }
    encodeNested(value) {
        return typesystem_1.onPrimitiveValueSelect(value, {
            onBoolean: () => this.booleanCodec.encodeNested(value),
            onNumerical: () => this.numericalCodec.encodeNested(value),
            onAddress: () => this.addressCodec.encodeNested(value),
            onBytes: () => this.bytesCodec.encodeNested(value),
            onH256: () => this.h256Codec.encodeNested(value),
            onTypeIdentifier: () => this.tokenIdentifierCodec.encodeNested(value),
        });
    }
    encodeTopLevel(value) {
        return typesystem_1.onPrimitiveValueSelect(value, {
            onBoolean: () => this.booleanCodec.encodeTopLevel(value),
            onNumerical: () => this.numericalCodec.encodeTopLevel(value),
            onAddress: () => this.addressCodec.encodeTopLevel(value),
            onBytes: () => this.bytesCodec.encodeTopLevel(value),
            onH256: () => this.h256Codec.encodeTopLevel(value),
            onTypeIdentifier: () => this.tokenIdentifierCodec.encodeTopLevel(value),
        });
    }
}
exports.PrimitiveBinaryCodec = PrimitiveBinaryCodec;
//# sourceMappingURL=primitive.js.map