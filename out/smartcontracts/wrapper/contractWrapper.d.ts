import { SmartContract, SmartContractAbi, ExecutionResultsBundle, Code, EndpointDefinition, Interaction, NativeTypes } from "..";
import { ChainSendContext } from "./chainSendContext";
import { Methods } from "./generateMethods";
import { FormattedCall } from "./formattedCall";
import { Address, Balance, IProvider, Transaction } from "../..";
import { PreparedCall } from "./preparedCall";
import { TransactionOnNetwork } from "../../transactionOnNetwork";
import { SendContext } from ".";
/**
 * Provides a simple interface in order to easily call or query the smart contract's methods.
 */
export declare class ContractWrapper extends ChainSendContext {
    readonly context: SendContext;
    private readonly smartContract;
    private readonly wasmPath;
    private readonly abi;
    private readonly builtinFunctions;
    readonly call: Methods<Promise<any>>;
    readonly results: Methods<Promise<ExecutionResultsBundle>>;
    readonly query: Methods<Promise<any>>;
    readonly format: Methods<FormattedCall>;
    private constructor();
    address(address: NativeTypes.NativeAddress): ContractWrapper;
    getAddress(): Address;
    getAbi(): SmartContractAbi;
    getSmartContract(): SmartContract;
    getCode(): Promise<Code>;
    private buildDeployTransaction;
    private handleDeployCall;
    static loadProject(provider: IProvider, builtinFunctions: ContractWrapper | null, projectPath: string, filenameHint?: string, sendContext?: SendContext): Promise<ContractWrapper>;
    handleQuery(endpoint: EndpointDefinition, ...args: any[]): Promise<any>;
    handleCall(endpoint: EndpointDefinition, ...args: any[]): Promise<any>;
    handleResults(endpoint: EndpointDefinition, ...args: any[]): Promise<ExecutionResultsBundle>;
    processTransactionAndInterpretResults({ transaction, interaction }: {
        transaction: Transaction;
        interaction: Interaction;
    }): Promise<{
        executionResultsBundle: ExecutionResultsBundle;
        result: any;
    }>;
    processTransaction(transaction: Transaction): Promise<TransactionOnNetwork>;
    handleFormat(endpoint: EndpointDefinition, ...args: any[]): FormattedCall;
    buildTransactionAndInteraction(endpoint: EndpointDefinition, args: any[]): {
        transaction: Transaction;
        interaction: Interaction;
    };
    prepareCallWithPayment(endpoint: EndpointDefinition, args: any[]): PreparedCall;
    convertPreparedCallToInteraction(preparedCall: PreparedCall): Interaction;
    applyValueModfiers(value: Balance | null, preparedCall: PreparedCall): void;
}
