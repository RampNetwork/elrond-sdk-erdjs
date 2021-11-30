/// <reference types="node" />
export declare const VALIDATOR_SECRETKEY_LENGTH = 32;
export declare const VALIDATOR_PUBKEY_LENGTH = 96;
export declare class BLS {
    private static isInitialized;
    static initIfNecessary(): Promise<void>;
    static guardInitialized(): void;
}
export declare class ValidatorSecretKey {
    private readonly secretKey;
    private readonly publicKey;
    constructor(buffer: Buffer);
    static fromPem(text: string, index?: number): ValidatorSecretKey;
    generatePublicKey(): ValidatorPublicKey;
    sign(message: Buffer): Buffer;
    hex(): string;
    valueOf(): Buffer;
}
export declare class ValidatorPublicKey {
    private readonly buffer;
    constructor(buffer: Buffer);
    hex(): string;
    valueOf(): Buffer;
}
