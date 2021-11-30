/// <reference types="node" />
import { PrimitiveType, PrimitiveValue } from "./types";
export declare class BytesType extends PrimitiveType {
    constructor();
}
export declare class BytesValue extends PrimitiveValue {
    private readonly value;
    constructor(value: Buffer);
    /**
     * Creates a BytesValue from a utf-8 string.
     */
    static fromUTF8(value: string): BytesValue;
    /**
     * Creates a BytesValue from a hex-encoded string.
     */
    static fromHex(value: string): BytesValue;
    getLength(): number;
    /**
     * Returns whether two objects have the same value.
     */
    equals(other: BytesValue): boolean;
    valueOf(): Buffer;
}
