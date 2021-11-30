import { Struct, StructField } from "./struct";
import { Type, TypedValue } from "./types";
import { StructType } from "./struct";
export declare class TupleType extends StructType {
    constructor(...typeParameters: Type[]);
    private static prepareName;
    private static prepareFieldDefinitions;
}
export declare class Tuple extends Struct {
    constructor(type: TupleType, fields: StructField[]);
    static fromItems(items: TypedValue[]): Tuple;
}
