import { Type, CustomType, TypedValue } from "./types";
export declare class StructType extends CustomType {
    readonly fields: StructFieldDefinition[];
    constructor(name: string, fields: StructFieldDefinition[]);
    static fromJSON(json: {
        name: string;
        fields: any[];
    }): StructType;
}
export declare class StructFieldDefinition {
    readonly name: string;
    readonly description: string;
    readonly type: Type;
    constructor(name: string, description: string, type: Type);
    static fromJSON(json: {
        name: string;
        description: string;
        type: string;
    }): StructFieldDefinition;
}
export declare class Struct extends TypedValue {
    private readonly fields;
    /**
     * Currently, one can only set fields at initialization time. Construction will be improved at a later time.
     */
    constructor(type: StructType, fields: StructField[]);
    private checkTyping;
    getFields(): ReadonlyArray<StructField>;
    valueOf(): any;
    equals(other: Struct): boolean;
}
export declare class StructField {
    readonly value: TypedValue;
    readonly name: string;
    constructor(value: TypedValue, name?: string);
    equals(other: StructField): boolean;
}
