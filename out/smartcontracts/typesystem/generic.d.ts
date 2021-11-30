import { Type, TypedValue } from "./types";
export declare class OptionType extends Type {
    constructor(typeParameter: Type);
    isAssignableFrom(type: Type): boolean;
}
export declare class ListType extends Type {
    constructor(typeParameter: Type);
}
export declare class OptionValue extends TypedValue {
    private readonly value;
    constructor(type: OptionType, value?: TypedValue | null);
    /**
     * Creates an OptionValue, as a missing option argument.
     */
    static newMissing(): OptionValue;
    static newMissingType(type: Type): OptionValue;
    /**
     * Creates an OptionValue, as a provided option argument.
     */
    static newProvided(typedValue: TypedValue): OptionValue;
    isSet(): boolean;
    getTypedValue(): TypedValue;
    valueOf(): any;
    equals(other: OptionValue): boolean;
}
export declare class List extends TypedValue {
    private readonly items;
    /**
     *
     * @param type the type of this TypedValue (an instance of ListType), not the type parameter of the ListType
     * @param items the items, having the type type.getFirstTypeParameter()
     */
    constructor(type: ListType, items: TypedValue[]);
    static fromItems(items: TypedValue[]): List;
    getLength(): number;
    getItems(): ReadonlyArray<TypedValue>;
    valueOf(): any[];
    equals(other: List): boolean;
}
