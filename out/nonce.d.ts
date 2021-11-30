/**
 * The nonce, as an immutable object.
 */
export declare class Nonce {
    /**
     * The actual numeric value.
     */
    private readonly value;
    /**
     * Creates a Nonce object given a value.
     */
    constructor(value: number);
    /**
     * Creates a new Nonce object by incrementing the current one.
     */
    increment(): Nonce;
    valueOf(): number;
    equals(other: Nonce): boolean;
}
