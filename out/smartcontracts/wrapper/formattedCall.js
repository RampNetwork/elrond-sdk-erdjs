"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedCall = exports.formatEndpoint = void 0;
const __1 = require("..");
/**
 * Creates a FormattedCall from the given endpoint and args.
 */
function formatEndpoint(executingEndpoint, interpretingEndpoint, ...args) {
    return new FormattedCall(executingEndpoint, interpretingEndpoint, args);
}
exports.formatEndpoint = formatEndpoint;
/**
 * Formats and validates the arguments of a bound call.
 * A bound call is represented by a function and its arguments packed together.
 * A function is defined as something that has an EndpointDefinition and may be:
 * - a smart contract method
 * - a built-in function (such as an ESDT transfer)
 */
class FormattedCall {
    constructor(executingEndpoint, interpretingEndpoint, args) {
        this.executingEndpoint = executingEndpoint;
        this.interpretingEndpoint = interpretingEndpoint;
        this.args = args;
    }
    getExecutingFunction() {
        return new __1.ContractFunction(this.executingEndpoint.name);
    }
    getInterpretingFunction() {
        return new __1.ContractFunction(this.interpretingEndpoint.name);
    }
    /**
     * Takes the given arguments, and converts them to typed values, validating them against the given endpoint in the process.
     */
    toTypedValues() {
        let expandedArgs = this.getExpandedArgs();
        return __1.NativeSerializer.nativeToTypedValues(expandedArgs, this.executingEndpoint);
    }
    toArgBuffers() {
        let typedValues = this.toTypedValues();
        return new __1.ArgSerializer().valuesToBuffers(typedValues);
    }
    /**
     * Formats the function name and its arguments as an array of buffers.
     * This is useful for nested calls (for the multisig smart contract or for ESDT transfers).
     * A formatted deploy call does not return the function name.
     */
    toCallBuffers() {
        if (this.executingEndpoint.isConstructor()) {
            return this.toArgBuffers();
        }
        return [Buffer.from(this.executingEndpoint.name), ...this.toArgBuffers()];
    }
    getExpandedArgs() {
        let expanded = [];
        for (let value of this.args) {
            if (value instanceof FormattedCall) {
                expanded = expanded.concat(value.toCallBuffers());
            }
            else {
                expanded.push(value);
            }
        }
        return expanded;
    }
}
exports.FormattedCall = FormattedCall;
//# sourceMappingURL=formattedCall.js.map