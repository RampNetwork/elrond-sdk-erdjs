/// <reference types="node" />
import { ContractFunction, EndpointDefinition, TypedValue } from "..";
/**
 * Creates a FormattedCall from the given endpoint and args.
 */
export declare function formatEndpoint(executingEndpoint: EndpointDefinition, interpretingEndpoint: EndpointDefinition, ...args: any[]): FormattedCall;
/**
 * Formats and validates the arguments of a bound call.
 * A bound call is represented by a function and its arguments packed together.
 * A function is defined as something that has an EndpointDefinition and may be:
 * - a smart contract method
 * - a built-in function (such as an ESDT transfer)
 */
export declare class FormattedCall {
    readonly executingEndpoint: EndpointDefinition;
    interpretingEndpoint: EndpointDefinition;
    readonly args: any[];
    constructor(executingEndpoint: EndpointDefinition, interpretingEndpoint: EndpointDefinition, args: any[]);
    getExecutingFunction(): ContractFunction;
    getInterpretingFunction(): ContractFunction;
    /**
     * Takes the given arguments, and converts them to typed values, validating them against the given endpoint in the process.
     */
    toTypedValues(): TypedValue[];
    toArgBuffers(): Buffer[];
    /**
     * Formats the function name and its arguments as an array of buffers.
     * This is useful for nested calls (for the multisig smart contract or for ESDT transfers).
     * A formatted deploy call does not return the function name.
     */
    toCallBuffers(): Buffer[];
    private getExpandedArgs;
}
