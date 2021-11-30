/// <reference types="node" />
/**
 * Signature, as an immutable object.
 */
export declare class Signature {
    private valueHex;
    constructor(value?: string | Buffer);
    static empty(): Signature;
    static fromHex(value: string): Signature;
    private static isValidHex;
    private static fromValidHex;
    static fromBuffer(buffer: Buffer): Signature;
    hex(): string;
    isEmpty(): boolean;
    private assertNotEmpty;
}
