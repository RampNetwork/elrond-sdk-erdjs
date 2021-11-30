/// <reference types="node" />
import { PrimitiveType, PrimitiveValue } from "../typesystem";
import { BinaryCodec } from "./binary";
export declare class PrimitiveBinaryCodec {
    private readonly binaryCodec;
    private readonly booleanCodec;
    private readonly numericalCodec;
    private readonly addressCodec;
    private readonly h256Codec;
    private readonly bytesCodec;
    private readonly tokenIdentifierCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeNested(buffer: Buffer, type: PrimitiveType): [PrimitiveValue, number];
    decodeTopLevel(buffer: Buffer, type: PrimitiveType): PrimitiveValue;
    encodeNested(value: PrimitiveValue): Buffer;
    encodeTopLevel(value: PrimitiveValue): Buffer;
}
