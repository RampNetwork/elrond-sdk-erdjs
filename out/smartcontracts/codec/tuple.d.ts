/// <reference types="node" />
import { Struct, TupleType, Tuple } from "../typesystem";
import { BinaryCodec } from "./binary";
export declare class TupleBinaryCodec {
    private structCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeTopLevel(buffer: Buffer, type: TupleType): Tuple;
    decodeNested(buffer: Buffer, type: TupleType): [Tuple, number];
    encodeNested(struct: Tuple): Buffer;
    encodeTopLevel(struct: Struct): Buffer;
}
