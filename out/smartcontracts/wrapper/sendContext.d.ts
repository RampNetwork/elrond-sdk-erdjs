import { GasLimit } from "../../networkParams";
import { IInteractionChecker } from "../interface";
import { IProvider } from "../../interface";
import { ContractLogger } from "./contractLogger";
import { TestWallet } from "../../testutils";
import { Balance } from "../../balance";
/**
 * Stores contextual information which is needed when preparing a transaction.
 */
export declare class SendContext {
    private sender_;
    private provider_;
    private gas_;
    private logger_;
    private value_;
    readonly checker: IInteractionChecker;
    constructor(provider: IProvider);
    provider(provider: IProvider): this;
    sender(sender: TestWallet): this;
    gas(gas: number): this;
    autoGas(baseGas: number): this;
    logger(logger: ContractLogger | null): this;
    value(value: Balance): this;
    getAndResetValue(): Balance | null;
    getSender(): TestWallet;
    getSenderOptional(): TestWallet | null;
    getProvider(): IProvider;
    getGasLimit(): GasLimit;
    getLogger(): ContractLogger | null;
}
