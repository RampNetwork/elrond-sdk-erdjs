/// <reference types="node" />
import { ContractCallPayloadBuilder, ContractDeployPayloadBuilder, ContractUpgradePayloadBuilder } from "./smartcontracts/transactionPayloadBuilders";
/**
 * The "data" field of a {@link Transaction}, as an immutable object.
 */
export declare class TransactionPayload {
    private readonly data;
    /**
     * Creates a TransactionPayload from a utf-8 string or from a buffer.
     */
    constructor(data?: string | Buffer);
    /**
     * Creates a TransactionPayload from a base-64 encoded string.
     */
    static fromEncoded(encoded?: string): TransactionPayload;
    /**
     * Returns whether the "data" is void.
     */
    isEmpty(): boolean;
    /**
     * Returns the base-64 representation of the data.
     */
    encoded(): string;
    /**
     * Returns the data as a buffer.
     */
    valueOf(): Buffer;
    toString(): string;
    getEncodedArguments(): string[];
    getRawArguments(): Buffer[];
    /**
     * Returns the length of the data.
     */
    length(): number;
    /**
     * Returns a new builder, to be used for contract deploy transactions.
     */
    static contractDeploy(): ContractDeployPayloadBuilder;
    /**
     * Returns a new builder, to be used for contract upgrade transactions.
     */
    static contractUpgrade(): ContractUpgradePayloadBuilder;
    /**
     * Returns a new builder, to be used for contract call transactions.
     */
    static contractCall(): ContractCallPayloadBuilder;
}
