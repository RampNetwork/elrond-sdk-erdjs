/// <reference types="node" />
import { PrimitiveType, PrimitiveValue } from "./types";
export declare class H256Type extends PrimitiveType {
    constructor();
}
export declare class H256Value extends PrimitiveValue {
    private readonly value;
    constructor(value: Buffer);
    /**
     * Returns whether two objects have the same value.
     */
    equals(other: H256Value): boolean;
    valueOf(): Buffer;
}
