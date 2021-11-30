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
exports.BinaryCodecConstraints = exports.BinaryCodec = void 0;
const errors = __importStar(require("../../errors"));
const typesystem_1 = require("../typesystem");
const utils_1 = require("../../utils");
const option_1 = require("./option");
const primitive_1 = require("./primitive");
const list_1 = require("./list");
const struct_1 = require("./struct");
const enum_1 = require("./enum");
const tuple_1 = require("./tuple");
class BinaryCodec {
    constructor(constraints = null) {
        this.constraints = constraints || new BinaryCodecConstraints();
        this.optionCodec = new option_1.OptionValueBinaryCodec(this);
        this.listCodec = new list_1.ListBinaryCodec(this);
        this.primitiveCodec = new primitive_1.PrimitiveBinaryCodec(this);
        this.structCodec = new struct_1.StructBinaryCodec(this);
        this.tupleCodec = new tuple_1.TupleBinaryCodec(this);
        this.enumCodec = new enum_1.EnumBinaryCodec(this);
    }
    decodeTopLevel(buffer, type) {
        this.constraints.checkBufferLength(buffer);
        let typedValue = typesystem_1.onTypeSelect(type, {
            onOption: () => this.optionCodec.decodeTopLevel(buffer, type.getFirstTypeParameter()),
            onList: () => this.listCodec.decodeTopLevel(buffer, type),
            onPrimitive: () => this.primitiveCodec.decodeTopLevel(buffer, type),
            onStruct: () => this.structCodec.decodeTopLevel(buffer, type),
            onTuple: () => this.tupleCodec.decodeTopLevel(buffer, type),
            onEnum: () => this.enumCodec.decodeTopLevel(buffer, type),
        });
        return typedValue;
    }
    decodeNested(buffer, type) {
        this.constraints.checkBufferLength(buffer);
        let [typedResult, decodedLength] = typesystem_1.onTypeSelect(type, {
            onOption: () => this.optionCodec.decodeNested(buffer, type.getFirstTypeParameter()),
            onList: () => this.listCodec.decodeNested(buffer, type),
            onPrimitive: () => this.primitiveCodec.decodeNested(buffer, type),
            onStruct: () => this.structCodec.decodeNested(buffer, type),
            onTuple: () => this.tupleCodec.decodeNested(buffer, type),
            onEnum: () => this.enumCodec.decodeNested(buffer, type),
        });
        return [typedResult, decodedLength];
    }
    encodeNested(typedValue) {
        utils_1.guardTrue(typedValue
            .getType()
            .getCardinality()
            .isSingular(), "singular cardinality, thus encodable type");
        return typesystem_1.onTypedValueSelect(typedValue, {
            onPrimitive: () => this.primitiveCodec.encodeNested(typedValue),
            onOption: () => this.optionCodec.encodeNested(typedValue),
            onList: () => this.listCodec.encodeNested(typedValue),
            onStruct: () => this.structCodec.encodeNested(typedValue),
            onTuple: () => this.tupleCodec.encodeNested(typedValue),
            onEnum: () => this.enumCodec.encodeNested(typedValue),
        });
    }
    encodeTopLevel(typedValue) {
        utils_1.guardType("value", typesystem_1.TypedValue, typedValue, false);
        utils_1.guardTrue(typedValue
            .getType()
            .getCardinality()
            .isSingular(), "singular cardinality, thus encodable type");
        return typesystem_1.onTypedValueSelect(typedValue, {
            onPrimitive: () => this.primitiveCodec.encodeTopLevel(typedValue),
            onOption: () => this.optionCodec.encodeTopLevel(typedValue),
            onList: () => this.listCodec.encodeTopLevel(typedValue),
            onStruct: () => this.structCodec.encodeTopLevel(typedValue),
            onTuple: () => this.tupleCodec.encodeTopLevel(typedValue),
            onEnum: () => this.enumCodec.encodeTopLevel(typedValue),
        });
    }
}
exports.BinaryCodec = BinaryCodec;
class BinaryCodecConstraints {
    constructor(init) {
        this.maxBufferLength = (init === null || init === void 0 ? void 0 : init.maxBufferLength) || 4096;
        this.maxListLength = (init === null || init === void 0 ? void 0 : init.maxListLength) || 1024;
    }
    checkBufferLength(buffer) {
        if (buffer.length > this.maxBufferLength) {
            throw new errors.ErrCodec(`Buffer too large: ${buffer.length} > ${this.maxBufferLength}`);
        }
    }
    /**
     * This constraint avoids computer-freezing decode bugs (e.g. due to invalid ABI or struct definitions).
     */
    checkListLength(length) {
        if (length > this.maxListLength) {
            throw new errors.ErrCodec(`List too large: ${length} > ${this.maxListLength}`);
        }
    }
}
exports.BinaryCodecConstraints = BinaryCodecConstraints;
//# sourceMappingURL=binary.js.map