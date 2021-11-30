/// <reference types="node" />
import { TokenIdentifierValue } from "../typesystem/tokenIdentifier";
export declare class TokenIdentifierCodec {
    private readonly bytesCodec;
    decodeNested(buffer: Buffer): [TokenIdentifierValue, number];
    decodeTopLevel(buffer: Buffer): TokenIdentifierValue;
    encodeNested(tokenIdentifier: TokenIdentifierValue): Buffer;
    encodeTopLevel(tokenIdentifier: TokenIdentifierValue): Buffer;
}
