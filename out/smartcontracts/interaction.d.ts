import { Balance } from "../balance";
import { GasLimit } from "../networkParams";
import { Transaction } from "../transaction";
import { TransactionOnNetwork } from "../transactionOnNetwork";
import { Query } from "./query";
import { QueryResponse } from "./queryResponse";
import { ContractFunction } from "./function";
import { Address } from "../address";
import { SmartContract } from "./smartContract";
import { EndpointDefinition, TypedValue } from "./typesystem";
import { Nonce } from "../nonce";
import { ExecutionResultsBundle, QueryResponseBundle } from "./interface";
/**
 * Interactions can be seen as mutable transaction & query builders.
 *
 * Aside from building transactions and queries, the interactors are also responsible for interpreting
 * the execution outcome for the objects they've built.
 */
export declare class Interaction {
    private readonly contract;
    private readonly executingFunction;
    private readonly interpretingFunction;
    private readonly args;
    private readonly receiver?;
    private nonce;
    private value;
    private gasLimit;
    constructor(contract: SmartContract, executingFunction: ContractFunction, interpretingFunction: ContractFunction, args: TypedValue[], receiver?: Address);
    getContract(): SmartContract;
    getInterpretingFunction(): ContractFunction;
    getExecutingFunction(): ContractFunction;
    getArguments(): TypedValue[];
    getValue(): Balance;
    getGasLimit(): GasLimit;
    buildTransaction(): Transaction;
    buildQuery(): Query;
    /**
     * Interprets the results of a previously broadcasted (and fully executed) smart contract transaction.
     * The outcome is structured such that it allows quick access to each level of detail.
     */
    interpretExecutionResults(transactionOnNetwork: TransactionOnNetwork): ExecutionResultsBundle;
    /**
     * Interprets the raw outcome of a Smart Contract query.
     * The outcome is structured such that it allows quick access to each level of detail.
     */
    interpretQueryResponse(queryResponse: QueryResponse): QueryResponseBundle;
    withValue(value: Balance): Interaction;
    withGasLimit(gasLimit: GasLimit): Interaction;
    withNonce(nonce: Nonce): Interaction;
    getEndpoint(): EndpointDefinition;
}
