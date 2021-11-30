import BigNumber from "bignumber.js";
import { Balance } from ".";
import { Token } from "./token";
/**
 * Creates balances for ESDTs (Fungible, Semi-Fungible (SFT) or Non-Fungible Tokens).
 */
export interface BalanceBuilder {
    /**
     * Creates a balance. Identical to {@link BalanceBuilder.value}
     */
    (value: BigNumber.Value): Balance;
    /**
     * Creates a denominated balance.
     * Note: For SFTs and NFTs this is equivalent to the raw balance, since SFTs and NFTs have 0 decimals.
     */
    value(value: BigNumber.Value): Balance;
    /**
     * Creates a balance. Does not apply denomination.
     */
    raw(value: BigNumber.Value): Balance;
    /**
     * Creates a new balance builder with the given nonce.
     */
    nonce(nonce: BigNumber.Value): BalanceBuilder;
    /**
     * Sets the nonce. Modifies the current instance.
     */
    setNonce(nonce: BigNumber.Value): void;
    getNonce(): BigNumber;
    hasNonce(): boolean;
    getToken(): Token;
    getTokenIdentifier(): string;
    /**
     * Creates a balance of value 1. Useful after specifying the nonce of an NFT.
     */
    one(): Balance;
}
export declare function createBalanceBuilder(token: Token): BalanceBuilder;
/**
 * Builder for an EGLD value.
 */
export declare const Egld: BalanceBuilder;
