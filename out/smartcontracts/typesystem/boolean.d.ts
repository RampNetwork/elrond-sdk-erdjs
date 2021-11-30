import { PrimitiveType, PrimitiveValue } from "./types";
export declare class BooleanType extends PrimitiveType {
    constructor();
}
/**
 * A boolean value fed to or fetched from a Smart Contract contract, as an immutable abstraction.
 */
export declare class BooleanValue extends PrimitiveValue {
    private readonly value;
    constructor(value: boolean);
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another BooleanValue
     */
    equals(other: BooleanValue): boolean;
    isTrue(): boolean;
    isFalse(): boolean;
    valueOf(): boolean;
}
