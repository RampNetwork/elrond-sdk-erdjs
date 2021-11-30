import { PrimitiveType, PrimitiveValue } from "./types";
export declare class StringType extends PrimitiveType {
    constructor();
}
export declare class StringValue extends PrimitiveValue {
    private readonly value;
    constructor(value: string);
    /**
     * Creates a StringValue from a utf-8 string.
     */
    static fromUTF8(value: string): StringValue;
    /**
     * Creates a StringValue from a hex-encoded string.
     */
    static fromHex(value: string): StringValue;
    getLength(): number;
    /**
     * Returns whether two objects have the same value.
     */
    equals(other: StringValue): boolean;
    valueOf(): string;
}
