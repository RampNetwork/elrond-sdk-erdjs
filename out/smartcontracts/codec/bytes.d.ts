/// <reference types="node" />
import { BytesValue } from "../typesystem/bytes";
/**
 * Encodes and decodes "BytesValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
export declare class BytesBinaryCodec {
    decodeNested(buffer: Buffer): [BytesValue, number];
    decodeTopLevel(buffer: Buffer): BytesValue;
    encodeNested(bytes: BytesValue): Buffer;
    encodeTopLevel(bytes: BytesValue): Buffer;
}
