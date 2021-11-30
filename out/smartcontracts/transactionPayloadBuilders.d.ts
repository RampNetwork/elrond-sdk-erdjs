import { TransactionPayload } from "../transactionPayload";
import { Code } from "./code";
import { CodeMetadata } from "./codeMetadata";
import { ContractFunction } from "./function";
import { TypedValue } from "./typesystem";
export declare const ArwenVirtualMachine = "0500";
/**
 * A builder for {@link TransactionPayload} objects, to be used for Smart Contract deployment transactions.
 */
export declare class ContractDeployPayloadBuilder {
    private code;
    private codeMetadata;
    private arguments;
    /**
     * Sets the code of the Smart Contract.
     */
    setCode(code: Code): ContractDeployPayloadBuilder;
    /**
     * Sets the code metadata of the Smart Contract.
     */
    setCodeMetadata(codeMetadata: CodeMetadata): ContractDeployPayloadBuilder;
    /**
     * Adds constructor (`init`) arguments.
     */
    addInitArg(arg: TypedValue): ContractDeployPayloadBuilder;
    /**
     * Sets constructor (`init`) arguments.
     */
    setInitArgs(args: TypedValue[]): ContractDeployPayloadBuilder;
    /**
     * Builds the {@link TransactionPayload}.
     */
    build(): TransactionPayload;
}
/**
 * A builder for {@link TransactionPayload} objects, to be used for Smart Contract upgrade transactions.
 */
export declare class ContractUpgradePayloadBuilder {
    private code;
    private codeMetadata;
    private arguments;
    /**
     * Sets the code of the Smart Contract.
     */
    setCode(code: Code): ContractUpgradePayloadBuilder;
    /**
     * Sets the code metadata of the Smart Contract.
     */
    setCodeMetadata(codeMetadata: CodeMetadata): ContractUpgradePayloadBuilder;
    /**
     * Adds upgrade (`init`) arguments.
     */
    addInitArg(arg: TypedValue): ContractUpgradePayloadBuilder;
    /**
     * Sets upgrade (`init`) arguments.
     */
    setInitArgs(args: TypedValue[]): ContractUpgradePayloadBuilder;
    /**
     * Builds the {@link TransactionPayload}.
     */
    build(): TransactionPayload;
}
/**
 * A builder for {@link TransactionPayload} objects, to be used for Smart Contract execution transactions.
 */
export declare class ContractCallPayloadBuilder {
    private contractFunction;
    private arguments;
    /**
     * Sets the function to be called (executed).
     */
    setFunction(contractFunction: ContractFunction): ContractCallPayloadBuilder;
    /**
     * Adds a function argument.
     */
    addArg(arg: TypedValue): ContractCallPayloadBuilder;
    /**
     * Sets the function arguments.
     */
    setArgs(args: TypedValue[]): ContractCallPayloadBuilder;
    /**
     * Builds the {@link TransactionPayload}.
     */
    build(): TransactionPayload;
}
