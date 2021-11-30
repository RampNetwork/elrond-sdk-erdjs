import { Balance, ContractLogger, IProvider, SendContext } from "../..";
import { TestWallet } from "../../testutils";
export declare class ChainSendContext {
    readonly context: SendContext;
    constructor(context: SendContext);
    sender(caller: TestWallet): this;
    gas(gas: number): this;
    autoGas(baseGas: number): this;
    value(value: Balance): this;
    logger(logger: ContractLogger | null): this;
    getProvider(): IProvider;
}
