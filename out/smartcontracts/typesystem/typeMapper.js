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
exports.TypeMapper = void 0;
const errors = __importStar(require("../../errors"));
const address_1 = require("./address");
const boolean_1 = require("./boolean");
const bytes_1 = require("./bytes");
const composite_1 = require("./composite");
const enum_1 = require("./enum");
const generic_1 = require("./generic");
const h256_1 = require("./h256");
const numerical_1 = require("./numerical");
const struct_1 = require("./struct");
const tokenIdentifier_1 = require("./tokenIdentifier");
const variadic_1 = require("./variadic");
const algebraic_1 = require("./algebraic");
const _1 = require(".");
class TypeMapper {
    constructor(customTypes = []) {
        this.openTypesConstructors = new Map([
            ["Option", generic_1.OptionType],
            ["List", generic_1.ListType],
            // For the following open generics, we use a slightly different typing than the one defined by elrond-wasm-rs (temporary workaround).
            ["VarArgs", variadic_1.VariadicType],
            ["MultiResultVec", variadic_1.VariadicType],
            ["variadic", variadic_1.VariadicType],
            ["OptionalArg", algebraic_1.OptionalType],
            ["optional", algebraic_1.OptionalType],
            ["OptionalResult", algebraic_1.OptionalType],
            ["multi", composite_1.CompositeType],
            ["MultiArg", composite_1.CompositeType],
            ["MultiResult", composite_1.CompositeType],
            ["multi", composite_1.CompositeType],
            // Perhaps we can adjust the ABI generator to only output "tuple", instead of "tupleN"?
            ["tuple", _1.TupleType],
            ["tuple2", _1.TupleType],
            ["tuple3", _1.TupleType],
            ["tuple4", _1.TupleType],
            ["tuple5", _1.TupleType],
            ["tuple6", _1.TupleType],
            ["tuple7", _1.TupleType],
            ["tuple8", _1.TupleType],
        ]);
        // For closed types, we hold actual type instances instead of type constructors (no type parameters needed).
        this.closedTypesMap = new Map([
            ["u8", new numerical_1.U8Type()],
            ["u16", new numerical_1.U16Type()],
            ["u32", new numerical_1.U32Type()],
            ["u64", new numerical_1.U64Type()],
            ["U64", new numerical_1.U64Type()],
            ["BigUint", new numerical_1.BigUIntType()],
            ["i8", new numerical_1.I8Type()],
            ["i16", new numerical_1.I16Type()],
            ["i32", new numerical_1.I32Type()],
            ["i64", new numerical_1.I64Type()],
            ["Bigint", new numerical_1.BigIntType()],
            ["BigInt", new numerical_1.BigIntType()],
            ["bool", new boolean_1.BooleanType()],
            ["bytes", new bytes_1.BytesType()],
            ["Address", new address_1.AddressType()],
            ["H256", new h256_1.H256Type()],
            ["utf-8 string", new _1.StringType()],
            ["TokenIdentifier", new tokenIdentifier_1.TokenIdentifierType()],
        ]);
        for (const customType of customTypes) {
            this.closedTypesMap.set(customType.getName(), customType);
        }
    }
    mapType(type) {
        let isGeneric = type.isGenericType();
        if (type instanceof enum_1.EnumType) {
            return type;
        }
        if (type instanceof struct_1.StructType) {
            // This will call mapType() recursively, for all the struct's fields.
            return this.mapStructType(type);
        }
        if (isGeneric) {
            // This will call mapType() recursively, for all the type parameters.
            return this.mapGenericType(type);
        }
        let knownClosedType = this.closedTypesMap.get(type.getName());
        if (!knownClosedType) {
            throw new errors.ErrTypingSystem(`Cannot map the type "${type.getName()}" to a known type`);
        }
        return knownClosedType;
    }
    feedCustomType(type) {
        this.closedTypesMap.delete(type.getName());
        this.closedTypesMap.set(type.getName(), type);
    }
    mapStructType(type) {
        let mappedFields = type.fields.map((item) => new struct_1.StructFieldDefinition(item.name, item.description, this.mapType(item.type)));
        let mappedStruct = new struct_1.StructType(type.getName(), mappedFields);
        return mappedStruct;
    }
    mapGenericType(type) {
        let typeParameters = type.getTypeParameters();
        let mappedTypeParameters = typeParameters.map((item) => this.mapType(item));
        let constructor = this.openTypesConstructors.get(type.getName());
        if (!constructor) {
            throw new errors.ErrTypingSystem(`Cannot map the generic type "${type.getName()}" to a known type`);
        }
        return new constructor(...mappedTypeParameters);
    }
}
exports.TypeMapper = TypeMapper;
//# sourceMappingURL=typeMapper.js.map