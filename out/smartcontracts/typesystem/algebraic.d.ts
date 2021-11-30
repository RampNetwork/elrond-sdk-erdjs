import { Type, TypedValue } from "./types";
/**
 * An optional is an algebraic type. It holds zero or one values.
 */
export declare class OptionalType extends Type {
    constructor(typeParameter: Type);
}
export declare class OptionalValue extends TypedValue {
    private readonly value;
    constructor(type: OptionalType, value?: TypedValue | null);
    isSet(): boolean;
    getTypedValue(): TypedValue;
    valueOf(): any;
    equals(other: OptionalValue): boolean;
}
