import { Address } from "../../address";
import { PrimitiveType, PrimitiveValue } from "./types";
export declare class AddressType extends PrimitiveType {
    constructor();
}
/**
 * An address fed to or fetched from a Smart Contract contract, as an immutable abstraction.
 */
export declare class AddressValue extends PrimitiveValue {
    private readonly value;
    constructor(value: Address);
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another AddressValue
     */
    equals(other: AddressValue): boolean;
    valueOf(): Address;
}
