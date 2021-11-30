/// <reference types="node" />
import { PrimitiveType, PrimitiveValue } from "./types";
export declare class TokenIdentifierType extends PrimitiveType {
    constructor();
}
export declare class TokenIdentifierValue extends PrimitiveValue {
    private readonly value;
    constructor(value: Buffer);
    getLength(): number;
    /**
     * Returns whether two objects have the same value.
     */
    equals(other: TokenIdentifierValue): boolean;
    valueOf(): Buffer;
}
