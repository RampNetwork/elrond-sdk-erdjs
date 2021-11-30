"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeSerializer = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const _1 = require(".");
const __1 = require("..");
const testutils_1 = require("../testutils");
const argumentErrorContext_1 = require("./argumentErrorContext");
const smartContract_1 = require("./smartContract");
const contractWrapper_1 = require("./wrapper/contractWrapper");
var NativeSerializer;
(function (NativeSerializer) {
    /**
     * Interprets a set of native javascript values into a set of typed values, given parameter definitions.
     */
    function nativeToTypedValues(args, endpoint) {
        args = args || [];
        args = handleVariadicArgsAndRePack(args, endpoint);
        let parameters = endpoint.input;
        let values = [];
        for (let i in parameters) {
            let parameter = parameters[i];
            let errorContext = new argumentErrorContext_1.ArgumentErrorContext(endpoint.name, i, parameter);
            let value = convertToTypedValue(args[i], parameter.type, errorContext);
            values.push(value);
        }
        return values;
    }
    NativeSerializer.nativeToTypedValues = nativeToTypedValues;
    function handleVariadicArgsAndRePack(args, endpoint) {
        let parameters = endpoint.input;
        let { min, max, variadic } = getArgumentsCardinality(parameters);
        if (!(min <= args.length && args.length <= max)) {
            throw new __1.ErrInvalidArgument(`Wrong number of arguments for endpoint ${endpoint.name}: expected between ${min} and ${max} arguments, have ${args.length}`);
        }
        if (variadic) {
            let lastArgIndex = parameters.length - 1;
            let lastArg = args.slice(lastArgIndex);
            if (lastArg.length > 0) {
                args[lastArgIndex] = lastArg;
            }
        }
        return args;
    }
    // A function may have one of the following formats:
    // f(arg1, arg2, optional<arg3>, optional<arg4>) returns { min: 2, max: 4, variadic: false }
    // f(arg1, variadic<bytes>) returns { min: 1, max: Infinity, variadic: true }
    // f(arg1, arg2, optional<arg3>, arg4, optional<arg5>, variadic<bytes>) returns { min: 2, max: Infinity, variadic: true }
    function getArgumentsCardinality(parameters) {
        let reversed = [...parameters].reverse(); // keep the original unchanged
        let min = parameters.length;
        let max = parameters.length;
        let variadic = false;
        if (reversed.length > 0 && reversed[0].type.getCardinality().isComposite()) {
            max = Infinity;
            variadic = true;
        }
        for (let parameter of reversed) {
            if (parameter.type.getCardinality().isSingular()) {
                break;
            }
            min -= 1;
        }
        return { min, max, variadic };
    }
    function convertToTypedValue(native, type, errorContext) {
        if (type instanceof _1.OptionType) {
            return toOptionValue(native, type, errorContext);
        }
        if (type instanceof _1.OptionalType) {
            return toOptionalValue(native, type, errorContext);
        }
        if (type instanceof _1.VariadicType) {
            return toVariadicValue(native, type, errorContext);
        }
        if (type instanceof _1.CompositeType) {
            return toCompositeValue(native, type, errorContext);
        }
        if (type instanceof _1.ListType) {
            return toListValue(native, type, errorContext);
        }
        if (type instanceof _1.PrimitiveType) {
            return toPrimitive(native, type, errorContext);
        }
        errorContext.throwError(`convertToTypedValue: unhandled type ${type}`);
    }
    function toOptionValue(native, type, errorContext) {
        if (native == null) {
            return _1.OptionValue.newMissing();
        }
        let converted = convertToTypedValue(native, type.getFirstTypeParameter(), errorContext);
        return _1.OptionValue.newProvided(converted);
    }
    function toOptionalValue(native, type, errorContext) {
        if (native == null) {
            return new _1.OptionalValue(type);
        }
        let converted = convertToTypedValue(native, type.getFirstTypeParameter(), errorContext);
        return new _1.OptionalValue(type, converted);
    }
    function toVariadicValue(native, type, errorContext) {
        if (native == null) {
            native = [];
        }
        if (native.map === undefined) {
            errorContext.convertError(native, "Variadic");
        }
        let converted = native.map(function (item) {
            return convertToTypedValue(item, type.getFirstTypeParameter(), errorContext);
        });
        return new _1.VariadicValue(type, converted);
    }
    function toListValue(native, type, errorContext) {
        if (native.map === undefined) {
            errorContext.convertError(native, "List");
        }
        let converted = native.map(function (item) {
            return convertToTypedValue(item, type.getFirstTypeParameter(), errorContext);
        });
        return new _1.List(type, converted);
    }
    function toCompositeValue(native, type, errorContext) {
        let typedValues = [];
        let typeParameters = type.getTypeParameters();
        errorContext.guardSameLength(native, typeParameters);
        for (let i in typeParameters) {
            typedValues.push(convertToTypedValue(native[i], typeParameters[i], errorContext));
        }
        return new _1.CompositeValue(type, typedValues);
    }
    function toPrimitive(native, type, errorContext) {
        if (type instanceof _1.NumericalType) {
            let number = new bignumber_js_1.default(native);
            return convertNumericalType(number, type, errorContext);
        }
        if (type instanceof _1.BytesType) {
            return convertNativeToBytesValue(native, errorContext);
        }
        if (type instanceof _1.AddressType) {
            return new _1.AddressValue(convertNativeToAddress(native, errorContext));
        }
        if (type instanceof _1.BooleanType) {
            return new _1.BooleanValue(native);
        }
        if (type instanceof _1.TokenIdentifierType) {
            return new _1.TokenIdentifierValue(convertNativeToBuffer(native, errorContext));
        }
        errorContext.throwError(`(function: toPrimitive) unsupported type ${type}`);
    }
    function convertNativeToBytesValue(native, errorContext) {
        if (native instanceof _1.Code) {
            return _1.BytesValue.fromHex(native.toString());
        }
        if (native instanceof Buffer) {
            return new _1.BytesValue(native);
        }
        if (typeof native === "string") {
            return _1.BytesValue.fromUTF8(native);
        }
        if ((native.getTokenIdentifier)) {
            return _1.BytesValue.fromUTF8(native.getTokenIdentifier());
        }
        errorContext.convertError(native, "BytesValue");
    }
    function convertNativeToBuffer(native, errorContext) {
        if (native instanceof Buffer) {
            return native;
        }
        if (typeof native === "string") {
            return Buffer.from(native);
        }
        if ((native.getTokenIdentifier)) {
            return Buffer.from(native.getTokenIdentifier());
        }
        errorContext.convertError(native, "Buffer");
    }
    function convertNativeToAddress(native, errorContext) {
        switch (native.constructor) {
            case __1.Address:
            case Buffer:
            case String:
                return new __1.Address(native);
            case contractWrapper_1.ContractWrapper:
                return native.getAddress();
            case smartContract_1.SmartContract:
                return native.getAddress();
            case testutils_1.TestWallet:
                return native.address;
            default:
                errorContext.convertError(native, "Address");
        }
    }
    NativeSerializer.convertNativeToAddress = convertNativeToAddress;
    function convertNumericalType(number, type, errorContext) {
        switch (type.constructor) {
            case _1.U8Type:
                return new _1.U8Value(number);
            case _1.I8Type:
                return new _1.I8Value(number);
            case _1.U16Type:
                return new _1.U16Value(number);
            case _1.I16Type:
                return new _1.I16Value(number);
            case _1.U32Type:
                return new _1.U32Value(number);
            case _1.I32Type:
                return new _1.I32Value(number);
            case _1.U64Type:
                return new _1.U64Value(number);
            case _1.I64Type:
                return new _1.I64Value(number);
            case _1.BigUIntType:
                return new _1.BigUIntValue(number);
            case _1.BigIntType:
                return new _1.BigIntValue(number);
            default:
                errorContext.unhandledType("convertNumericalType", type);
        }
    }
})(NativeSerializer = exports.NativeSerializer || (exports.NativeSerializer = {}));
//# sourceMappingURL=nativeSerializer.js.map