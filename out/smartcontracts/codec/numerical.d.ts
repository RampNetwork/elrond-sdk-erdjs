/// <reference types="node" />
import { NumericalType, NumericalValue } from "../typesystem";
/**
 * Encodes and decodes "NumericalValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
export declare class NumericalBinaryCodec {
    decodeNested(buffer: Buffer, type: NumericalType): [NumericalValue, number];
    decodeTopLevel(buffer: Buffer, type: NumericalType): NumericalValue;
    encodeNested(primitive: NumericalValue): Buffer;
    private encodeNestedFixedSize;
    encodeTopLevel(primitive: NumericalValue): Buffer;
    encodePrimitive(primitive: NumericalValue): Buffer;
}
