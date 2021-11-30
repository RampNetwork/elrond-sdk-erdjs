/// <reference types="node" />
import { H256Value } from "../typesystem/h256";
export declare class H256BinaryCodec {
    /**
     * Reads and decodes a H256Value from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeNested(buffer: Buffer): [H256Value, number];
    /**
     * Reads and decodes a H256Value from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeTopLevel(buffer: Buffer): H256Value;
    /**
     * Encodes a H256Value to a buffer.
     */
    encodeNested(primitive: H256Value): Buffer;
    /**
     * Encodes a H256Value to a buffer.
     */
    encodeTopLevel(primitive: H256Value): Buffer;
}
