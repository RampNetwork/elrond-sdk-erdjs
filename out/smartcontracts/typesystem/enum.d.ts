import { CustomType, TypedValue } from "./types";
export declare class EnumType extends CustomType {
    readonly variants: EnumVariantDefinition[];
    constructor(name: string, variants: EnumVariantDefinition[]);
    static fromJSON(json: {
        name: string;
        variants: any[];
    }): EnumType;
    getVariantByDiscriminant(discriminant: number): EnumVariantDefinition;
    getVariantByName(name: string): EnumVariantDefinition;
}
export declare class EnumVariantDefinition {
    readonly name: string;
    readonly discriminant: number;
    constructor(name: string, discriminant: number);
    static fromJSON(json: {
        name: string;
        discriminant: number;
    }): EnumVariantDefinition;
}
export declare class EnumValue extends TypedValue {
    readonly name: string;
    readonly discriminant: number;
    private constructor();
    static fromName(type: EnumType, name: string): EnumValue;
    static fromDiscriminant(type: EnumType, discriminant: number): EnumValue;
    equals(other: EnumValue): boolean;
    valueOf(): string;
}
