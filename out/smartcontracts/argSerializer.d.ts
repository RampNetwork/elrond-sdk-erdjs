/// <reference types="node" />
import { EndpointParameterDefinition, TypedValue } from "./typesystem";
export declare const ArgumentsSeparator = "@";
export declare class ArgSerializer {
    /**
     * Reads typed values from an arguments string (e.g. aa@bb@@cc), given parameter definitions.
     */
    stringToValues(joinedString: string, parameters: EndpointParameterDefinition[]): TypedValue[];
    /**
     * Reads raw buffers from an arguments string (e.g. aa@bb@@cc).
     */
    stringToBuffers(joinedString: string): Buffer[];
    /**
     * Decodes a set of buffers into a set of typed values, given parameter definitions.
     */
    buffersToValues(buffers: Buffer[], parameters: EndpointParameterDefinition[]): TypedValue[];
    /**
     * Serializes a set of typed values into an arguments string (e.g. aa@bb@@cc).
     */
    valuesToString(values: TypedValue[]): string;
    /**
     * Serializes a set of typed values into a set of strings.
     */
    valuesToStrings(values: TypedValue[]): string[];
    /**
     * Serializes a set of typed values into a set of strings buffers.
     * Variadic types and composite types might result into none, one or more buffers.
     */
    valuesToBuffers(values: TypedValue[]): Buffer[];
}
