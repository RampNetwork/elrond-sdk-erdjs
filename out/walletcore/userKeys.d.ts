/// <reference types="node" />
import { Address } from "../address";
export declare const USER_SEED_LENGTH = 32;
export declare const USER_PUBKEY_LENGTH = 32;
export declare class UserSecretKey {
    private readonly buffer;
    constructor(buffer: Buffer);
    static fromString(value: string): UserSecretKey;
    static fromPem(text: string, index?: number): UserSecretKey;
    generatePublicKey(): UserPublicKey;
    sign(message: Buffer): Buffer;
    hex(): string;
    valueOf(): Buffer;
}
export declare class UserPublicKey {
    private readonly buffer;
    constructor(buffer: Buffer);
    verify(message: Buffer, signature: Buffer): boolean;
    hex(): string;
    toAddress(): Address;
    valueOf(): Buffer;
}
