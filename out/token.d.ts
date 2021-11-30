import BigNumber from "bignumber.js";
import { Address } from "./address";
export declare enum TokenType {
    Fungible = 0,
    Semifungible = 1,
    Nonfungible = 2
}
export declare class Token {
    identifier: string;
    name: string;
    type: TokenType;
    owner: Address;
    minted: BigNumber;
    burnt: BigNumber;
    decimals: number;
    isPaused: boolean;
    canUpgrade: boolean;
    canMint: boolean;
    canBurn: boolean;
    canChangeOwner: boolean;
    canPause: boolean;
    canFreeze: boolean;
    canWipe: boolean;
    canAddSpecialRoles: boolean;
    canTransferNftCreateRole: boolean;
    nftCreateStopped: boolean;
    wiped: boolean;
    constructor(init?: Partial<Token>);
    static fromHttpResponse(response: {
        token: string;
        name: string;
        type: string;
        owner: string;
        minted: string;
        burnt: string;
        decimals: number;
        isPaused: boolean;
        canUpgrade: boolean;
        canMint: boolean;
        canBurn: boolean;
        canChangeOwner: boolean;
        canPause: boolean;
        canFreeze: boolean;
        canWipe: boolean;
    }): Token;
    static fromTokenProperties(tokenIdentifier: string, results: any[]): Token;
    getTokenName(): string;
    typeAsString(): string;
    getTokenIdentifier(): string;
    isEgld(): boolean;
    isFungible(): boolean;
    isNft(): boolean;
}
