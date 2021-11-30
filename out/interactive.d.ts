import { BalanceBuilder, IProvider, ProxyProvider, SystemWrapper } from ".";
import { TestWallet } from "./testutils";
declare type InteractivePackage = {
    erdSys: SystemWrapper;
    Egld: BalanceBuilder;
    wallets: Record<string, TestWallet>;
};
export declare function setupInteractive(providerChoice: string): Promise<InteractivePackage>;
export declare function setupInteractiveWithProvider(provider: IProvider): Promise<InteractivePackage>;
export declare function getProviders(): Record<string, ProxyProvider>;
export declare function chooseProvider(providerChoice: string): IProvider;
export {};
