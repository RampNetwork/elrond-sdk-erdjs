/// <reference types="node" />
import BigNumber from "bignumber.js";
import { ContractWrapper, SendContext } from "..";
import { Address, Balance, IProvider, BalanceBuilder } from "../..";
import { TestWallet } from "../../testutils";
import { NativeTypes } from "../nativeSerializer";
import { ChainSendContext } from "./chainSendContext";
export declare namespace SystemConstants {
    let SYSTEM_ABI_PATH: string;
    let ESDT_CONTRACT_ADDRESS: Address;
    let MIN_TRANSACTION_GAS: number;
    let ESDT_ISSUE_GAS_LIMIT: number;
    let ESDT_TRANSFER_GAS_LIMIT: number;
    let ESDT_NFT_TRANSFER_GAS_LIMIT: number;
    let ESDT_BASE_GAS_LIMIT: number;
}
export declare class SystemWrapper extends ChainSendContext {
    private readonly provider;
    private readonly builtinFunctions;
    readonly esdtSystemContract: ContractWrapper;
    readonly issueCost: Balance;
    private readonly sendWrapper;
    private constructor();
    loadWrapper(projectPath: string, filenameHint?: string, context?: SendContext): Promise<ContractWrapper>;
    static getEsdtContractConfig(esdtSystemContract: ContractWrapper): Promise<EsdtContractConfig>;
    static load(provider: IProvider): Promise<SystemWrapper>;
    send(receiver: string | Buffer | Address | TestWallet): Promise<void>;
    issueFungible(...args: any[]): Promise<BalanceBuilder>;
    issueSemiFungible(...args: any[]): Promise<BalanceBuilder>;
    issueNonFungible(...args: any[]): Promise<BalanceBuilder>;
    esdtNftCreate(balanceBuilder: BalanceBuilder, ...args: any[]): Promise<BalanceBuilder>;
    recallToken(tokenIdentifier: string): Promise<BalanceBuilder>;
    getBalance(address: NativeTypes.NativeAddress, balanceBuilder: BalanceBuilder): Promise<Balance>;
    getBalanceList(address: NativeTypes.NativeAddress, balanceBuilder: BalanceBuilder): Promise<Balance[]>;
    getTokenData(address: Address, balanceBuilder: BalanceBuilder): Promise<any>;
    currentNonce(): Promise<number>;
}
export declare type EsdtContractConfig = {
    ownerAddress: Address;
    baseIssuingCost: Balance;
    minTokenNameLength: BigNumber;
    maxTokenNameLength: BigNumber;
};
export declare function getGasFromValue(baseGas: number, value: Balance | null): number;
