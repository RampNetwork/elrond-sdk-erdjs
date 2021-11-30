import { PrimitiveType, PrimitiveValue } from "./types";
import BigNumber from "bignumber.js";
export declare class NumericalType extends PrimitiveType {
    readonly sizeInBytes: number;
    readonly withSign: boolean;
    protected constructor(name: string, sizeInBytes: number, withSign: boolean);
    hasFixedSize(): boolean;
    hasArbitrarySize(): boolean;
}
export declare class U8Type extends NumericalType {
    constructor();
}
export declare class I8Type extends NumericalType {
    constructor();
}
export declare class U16Type extends NumericalType {
    constructor();
}
export declare class I16Type extends NumericalType {
    constructor();
}
export declare class U32Type extends NumericalType {
    constructor();
}
export declare class I32Type extends NumericalType {
    constructor();
}
export declare class U64Type extends NumericalType {
    constructor();
}
export declare class I64Type extends NumericalType {
    constructor();
}
export declare class BigUIntType extends NumericalType {
    constructor();
}
export declare class BigIntType extends NumericalType {
    constructor();
}
/**
 * A numerical value fed to or fetched from a Smart Contract contract, as a strongly-typed, immutable abstraction.
 */
export declare class NumericalValue extends PrimitiveValue {
    readonly value: BigNumber;
    readonly sizeInBytes: number | undefined;
    readonly withSign: boolean;
    constructor(type: NumericalType, value: BigNumber);
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another NumericalValue
     */
    equals(other: NumericalValue): boolean;
    valueOf(): BigNumber;
}
export declare class U8Value extends NumericalValue {
    constructor(value: number | BigNumber);
}
export declare class I8Value extends NumericalValue {
    constructor(value: number | BigNumber);
}
export declare class U16Value extends NumericalValue {
    constructor(value: number | BigNumber);
}
export declare class I16Value extends NumericalValue {
    constructor(value: number | BigNumber);
}
export declare class U32Value extends NumericalValue {
    constructor(value: number | BigNumber);
}
export declare class I32Value extends NumericalValue {
    constructor(value: number | BigNumber);
}
export declare class U64Value extends NumericalValue {
    constructor(value: BigNumber);
}
export declare class I64Value extends NumericalValue {
    constructor(value: BigNumber);
}
export declare class BigUIntValue extends NumericalValue {
    constructor(value: BigNumber);
}
export declare class BigIntValue extends NumericalValue {
    constructor(value: BigNumber);
}
