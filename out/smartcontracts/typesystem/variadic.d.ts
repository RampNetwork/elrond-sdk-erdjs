import { Type, TypedValue } from "./types";
export declare class VariadicType extends Type {
    constructor(typeParameter: Type);
}
/**
 * An abstraction that represents a sequence of values held under the umbrella of a variadic input / output parameter.
 *
 * Since at the time of constructing input parameters or decoding output parameters, the length is known,
 * this TypedValue behaves similar to a List.
 */
export declare class VariadicValue extends TypedValue {
    private readonly items;
    /**
     *
     * @param type the type of this TypedValue (an instance of VariadicType), not the type parameter of the VariadicType
     * @param items the items, having the type type.getFirstTypeParameter()
     */
    constructor(type: VariadicType, items: TypedValue[]);
    static fromItems(...items: TypedValue[]): VariadicValue;
    getItems(): ReadonlyArray<TypedValue>;
    valueOf(): any[];
    equals(other: VariadicValue): boolean;
}
