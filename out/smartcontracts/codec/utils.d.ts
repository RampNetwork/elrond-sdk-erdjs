/// <reference types="node" />
import BigNumber from "bignumber.js";
/**
 * Returns whether the most significant bit of a given byte (within a buffer) is 1.
 * @param buffer the buffer to test
 * @param byteIndex the index of the byte to test
 */
export declare function isMsbOne(buffer: Buffer, byteIndex?: number): boolean;
/**
 * Returns whether the most significant bit of a given byte (within a buffer) is 0.
 * @param buffer the buffer to test
 * @param byteIndex the index of the byte to test
 */
export declare function isMsbZero(buffer: Buffer, byteIndex?: number): boolean;
export declare function cloneBuffer(buffer: Buffer): Buffer;
export declare function bufferToBigInt(buffer: Buffer): BigNumber;
export declare function bigIntToBuffer(value: BigNumber): Buffer;
export declare function getHexMagnitudeOfBigInt(value: BigNumber): string;
export declare function flipBufferBitsInPlace(buffer: Buffer): void;
export declare function prependByteToBuffer(buffer: Buffer, byte: number): Buffer;
/**
 * Discards the leading bytes that are merely a padding of the leading sign bit (but keeps the payload).
 * @param buffer A number, represented as a sequence of bytes (big-endian)
 */
export declare function discardSuperfluousBytesInTwosComplement(buffer: Buffer): Buffer;
/**
 * Discards the leading zero bytes.
 * @param buffer A number, represented as a sequence of bytes (big-endian)
 */
export declare function discardSuperfluousZeroBytes(buffer: Buffer): Buffer;
