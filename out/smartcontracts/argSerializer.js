"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgSerializer = exports.ArgumentsSeparator = void 0;
const codec_1 = require("./codec");
const composite_1 = require("./typesystem/composite");
const variadic_1 = require("./typesystem/variadic");
const algebraic_1 = require("./typesystem/algebraic");
exports.ArgumentsSeparator = "@";
/**
 * For the moment, this is the only codec used.
 */
const Codec = new codec_1.BinaryCodec();
class ArgSerializer {
    /**
     * Reads typed values from an arguments string (e.g. aa@bb@@cc), given parameter definitions.
     */
    stringToValues(joinedString, parameters) {
        let buffers = this.stringToBuffers(joinedString);
        let values = this.buffersToValues(buffers, parameters);
        return values;
    }
    /**
     * Reads raw buffers from an arguments string (e.g. aa@bb@@cc).
     */
    stringToBuffers(joinedString) {
        // We also keep the zero-length buffers (they could encode missing options, Option<T>).
        return joinedString.split(exports.ArgumentsSeparator).map(item => Buffer.from(item, "hex"));
    }
    /**
     * Decodes a set of buffers into a set of typed values, given parameter definitions.
     */
    buffersToValues(buffers, parameters) {
        // TODO: Refactor, split (function is quite complex).
        buffers = buffers || [];
        let values = [];
        let bufferIndex = 0;
        let numBuffers = buffers.length;
        for (let i = 0; i < parameters.length; i++) {
            let parameter = parameters[i];
            let type = parameter.type;
            let value = readValue(type);
            values.push(value);
        }
        // This is a recursive function.
        function readValue(type) {
            // TODO: Use matchers.
            if (type instanceof algebraic_1.OptionalType) {
                let typedValue = readValue(type.getFirstTypeParameter());
                return new algebraic_1.OptionalValue(type, typedValue);
            }
            else if (type instanceof variadic_1.VariadicType) {
                let typedValues = [];
                while (!hasReachedTheEnd()) {
                    typedValues.push(readValue(type.getFirstTypeParameter()));
                }
                return new variadic_1.VariadicValue(type, typedValues);
            }
            else if (type instanceof composite_1.CompositeType) {
                let typedValues = [];
                for (const typeParameter of type.getTypeParameters()) {
                    typedValues.push(readValue(typeParameter));
                }
                return new composite_1.CompositeValue(type, typedValues);
            }
            else {
                // Non-composite (singular), non-variadic (fixed) type.
                // The only branching without a recursive call.
                let typedValue = decodeNextBuffer(type);
                return typedValue;
            }
        }
        function decodeNextBuffer(type) {
            if (hasReachedTheEnd()) {
                return null;
            }
            let buffer = buffers[bufferIndex++];
            let decodedValue = Codec.decodeTopLevel(buffer, type);
            return decodedValue;
        }
        function hasReachedTheEnd() {
            return bufferIndex >= numBuffers;
        }
        return values;
    }
    /**
     * Serializes a set of typed values into an arguments string (e.g. aa@bb@@cc).
     */
    valuesToString(values) {
        let strings = this.valuesToStrings(values);
        let joinedString = strings.join(exports.ArgumentsSeparator);
        return joinedString;
    }
    /**
     * Serializes a set of typed values into a set of strings.
     */
    valuesToStrings(values) {
        let buffers = this.valuesToBuffers(values);
        let strings = buffers.map(buffer => buffer.toString("hex"));
        return strings;
    }
    /**
     * Serializes a set of typed values into a set of strings buffers.
     * Variadic types and composite types might result into none, one or more buffers.
     */
    valuesToBuffers(values) {
        // TODO: Refactor, split (function is quite complex).
        let buffers = [];
        for (const value of values) {
            handleValue(value);
        }
        // This is a recursive function. It appends to the "buffers" variable.
        function handleValue(value) {
            // TODO: Use matchers.
            if (value instanceof algebraic_1.OptionalValue) {
                if (value.isSet()) {
                    handleValue(value.getTypedValue());
                }
            }
            else if (value instanceof variadic_1.VariadicValue) {
                for (const item of value.getItems()) {
                    handleValue(item);
                }
            }
            else if (value instanceof composite_1.CompositeValue) {
                for (const item of value.getItems()) {
                    handleValue(item);
                }
            }
            else {
                // Non-composite (singular), non-variadic (fixed) type.
                // The only branching without a recursive call.
                let buffer = Codec.encodeTopLevel(value);
                buffers.push(buffer);
            }
        }
        return buffers;
    }
}
exports.ArgSerializer = ArgSerializer;
//# sourceMappingURL=argSerializer.js.map