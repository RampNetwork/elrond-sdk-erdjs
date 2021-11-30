import { Type, TypedValue } from "./types";
export declare class CompositeType extends Type {
    constructor(...typeParameters: Type[]);
}
export declare class CompositeValue extends TypedValue {
    private readonly items;
    constructor(type: CompositeType, items: TypedValue[]);
    static fromItems(...items: TypedValue[]): CompositeValue;
    getItems(): ReadonlyArray<TypedValue>;
    valueOf(): any[];
    equals(other: CompositeValue): boolean;
}
