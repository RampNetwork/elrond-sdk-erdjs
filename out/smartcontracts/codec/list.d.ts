/// <reference types="node" />
import { Type, List } from "../typesystem";
import { BinaryCodec } from "./binary";
/**
 * Encodes and decodes "List" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
export declare class ListBinaryCodec {
    private readonly binaryCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeNested(buffer: Buffer, type: Type): [List, number];
    decodeTopLevel(buffer: Buffer, type: Type): List;
    encodeNested(list: List): Buffer;
    encodeTopLevel(list: List): Buffer;
}
