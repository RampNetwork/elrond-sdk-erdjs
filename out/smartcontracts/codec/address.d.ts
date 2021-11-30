/// <reference types="node" />
import { AddressValue } from "../typesystem";
export declare class AddressBinaryCodec {
    /**
     * Reads and decodes an AddressValue from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeNested(buffer: Buffer): [AddressValue, number];
    /**
     * Reads and decodes an AddressValue from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeTopLevel(buffer: Buffer): AddressValue;
    /**
     * Encodes an AddressValue to a buffer.
     */
    encodeNested(primitive: AddressValue): Buffer;
    /**
     * Encodes an AddressValue to a buffer.
     */
    encodeTopLevel(primitive: AddressValue): Buffer;
}
