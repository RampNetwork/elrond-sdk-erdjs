/// <reference types="node" />
import { Account } from "../account";
import { Address } from "../address";
import { IProvider, ISigner } from "../interface";
export declare function loadAndSyncTestWallets(provider: IProvider): Promise<Record<string, TestWallet>>;
export declare function syncTestWallets(wallets: Record<string, TestWallet>, provider: IProvider): Promise<void>;
export declare function loadTestWallets(): Promise<Record<string, TestWallet>>;
export declare function loadMnemonic(): Promise<string>;
export declare function loadPassword(): Promise<string>;
export declare function loadTestWallet(name: string): Promise<TestWallet>;
export declare class TestWallet {
    readonly address: Address;
    readonly secretKeyHex: string;
    readonly secretKey: Buffer;
    readonly signer: ISigner;
    readonly keyFileObject: any;
    readonly pemFileText: any;
    readonly account: Account;
    constructor(address: Address, secretKeyHex: string, keyFileObject: any, pemFileText: any);
    sync(provider: IProvider): Promise<this>;
}
