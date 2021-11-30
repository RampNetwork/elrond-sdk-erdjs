/// <reference types="node" />
import { StructType, Struct } from "../typesystem";
import { BinaryCodec } from "./binary";
export declare class StructBinaryCodec {
    private readonly binaryCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeTopLevel(buffer: Buffer, type: StructType): Struct;
    decodeNested(buffer: Buffer, type: StructType): [Struct, number];
    encodeNested(struct: Struct): Buffer;
    encodeTopLevel(struct: Struct): Buffer;
}
