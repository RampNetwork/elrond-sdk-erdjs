/// <reference types="node" />
/**
 * An Elrond Address, as an immutable object.
 */
export declare class Address {
    private valueHex;
    /**
     * Creates an address object, given a raw string (whether a hex pubkey or a Bech32 address), a sequence of bytes, or another Address object.
     */
    constructor(value?: Address | Buffer | string);
    /**
     * Creates an address object from another address object
     */
    static fromAddress(address: Address): Address;
    private static fromValidHex;
    /**
     * Creates an address object from a Buffer
     */
    static fromBuffer(buffer: Buffer): Address;
    /**
     * Creates an address object from a string (hex or bech32)
     */
    static fromString(value: string): Address;
    private static isValidHex;
    /**
     * Creates an address object from a hex-encoded string
     */
    static fromHex(value: string): Address;
    /**
     * Creates an address object from a bech32-encoded string
     */
    static fromBech32(value: string): Address;
    /**
     * Returns the hex representation of the address (pubkey)
     */
    hex(): string;
    /**
     * Returns the bech32 representation of the address
     */
    bech32(): string;
    /**
     * Returns the pubkey as raw bytes (buffer)
     */
    pubkey(): Buffer;
    /**
     * Throws an error if the address is empty.
     */
    assertNotEmpty(): void;
    /**
     * Returns whether the address is empty.
     */
    isEmpty(): boolean;
    /**
     * Compares the address to another address
     */
    equals(other: Address | null): boolean;
    /**
     * Returns the bech32 representation of the address
     */
    toString(): string;
    /**
     * Converts the address to a pretty, plain JavaScript object.
     */
    toJSON(): object;
    /**
     * Creates the Zero address (the one that should be used when deploying smart contracts)
     */
    static Zero(): Address;
    isContractAddress(): boolean;
}
