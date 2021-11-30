/// <reference types="node" />
import { BooleanValue } from "../typesystem";
/**
 * Encodes and decodes "BooleanValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
export declare class BooleanBinaryCodec {
    private static readonly TRUE;
    private static readonly FALSE;
    decodeNested(buffer: Buffer): [BooleanValue, number];
    decodeTopLevel(buffer: Buffer): BooleanValue;
    encodeNested(primitive: BooleanValue): Buffer;
    encodeTopLevel(primitive: BooleanValue): Buffer;
}
