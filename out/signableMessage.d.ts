/// <reference types="node" />
import { ISignable } from "./interface";
import { Signature } from "./signature";
import { Address } from "./address";
export declare const MESSAGE_PREFIX = "\u0017Elrond Signed Message:\n";
export declare class SignableMessage implements ISignable {
    /**
     * Actual message being signed.
     */
    message: Buffer;
    /**
     * Signature obtained by a signer of type @param signer .
     */
    signature: Signature;
    /**
     * Address of the wallet that performed the signing operation
     */
    address: Address;
    /**
     * Text representing the identifer for the application that signed the message
     */
    signer: string;
    /**
     * Number representing the signable message version
     */
    version: number;
    constructor(init?: Partial<SignableMessage>);
    serializeForSigning(): Buffer;
    serializeForSigningRaw(): Buffer;
    getSignature(): Signature;
    applySignature(signature: Signature): void;
    getMessageSize(): Buffer;
    toJSON(): object;
}
