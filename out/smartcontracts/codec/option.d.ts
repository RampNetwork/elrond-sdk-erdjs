/// <reference types="node" />
import { Type, OptionValue } from "../typesystem";
import { BinaryCodec } from "./binary";
/**
 * Encodes and decodes "OptionValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
export declare class OptionValueBinaryCodec {
    private readonly binaryCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeNested(buffer: Buffer, type: Type): [OptionValue, number];
    decodeTopLevel(buffer: Buffer, type: Type): OptionValue;
    encodeNested(optionValue: OptionValue): Buffer;
    encodeTopLevel(optionValue: OptionValue): Buffer;
}
