/// <reference types="node" />
export declare class Hash {
    /**
     * The hash, as a hex-encoded string.
     */
    readonly hash: Buffer;
    /**
     * Creates a new Hash object.
     *
     * @param hash The hash, as a Buffer or a hex-encoded string.
     */
    constructor(hash: Buffer | string);
    static empty(): Hash;
    /**
     * Returns whether the hash is empty (not computed).
     */
    isEmpty(): boolean;
    toString(): string;
    valueOf(): Buffer;
}
