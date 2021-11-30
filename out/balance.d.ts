import { BigNumber } from "bignumber.js";
import { Token } from "./token";
/**
 * Balance, as an immutable object.
 */
export declare class Balance {
    readonly token: Token;
    private readonly nonce;
    private readonly value;
    /**
     * Creates a Balance object.
     */
    constructor(token: Token, nonce: BigNumber.Value, value: BigNumber.Value);
    /**
     * Creates a balance object from an EGLD value (denomination will be applied).
     */
    static egld(value: BigNumber.Value): Balance;
    /**
     * Creates a balance object from a string (with denomination included).
     */
    static fromString(value: string): Balance;
    /**
     * Creates a zero-valued EGLD balance object.
     */
    static Zero(): Balance;
    isZero(): boolean;
    isEgld(): boolean;
    isSet(): boolean;
    /**
     * Returns the string representation of the value (as EGLD currency).
     */
    toCurrencyString(): string;
    toDenominated(): string;
    /**
     * Returns the string representation of the value (its big-integer form).
     */
    toString(): string;
    /**
     * Converts the balance to a pretty, plain JavaScript object.
     */
    toJSON(): object;
    getNonce(): BigNumber;
    valueOf(): BigNumber;
    plus(other: Balance): Balance;
    minus(other: Balance): Balance;
    times(n: BigNumber.Value): Balance;
    div(n: BigNumber.Value): Balance;
    isEqualTo(other: Balance): boolean;
    checkSameToken(other: Balance): void;
}
