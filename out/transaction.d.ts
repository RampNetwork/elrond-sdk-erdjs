/// <reference types="node" />
import { BigNumber } from "bignumber.js";
import { IProvider, ISignable } from "./interface";
import { Address } from "./address";
import { Balance } from "./balance";
import { ChainID, GasLimit, GasPrice, TransactionOptions, TransactionVersion } from "./networkParams";
import { NetworkConfig } from "./networkConfig";
import { Nonce } from "./nonce";
import { Signature } from "./signature";
import { TransactionPayload } from "./transactionPayload";
import { TypedEvent } from "./events";
import { TransactionOnNetwork } from "./transactionOnNetwork";
import { Hash } from "./hash";
/**
 * An abstraction for creating, signing and broadcasting Elrond transactions.
 */
export declare class Transaction implements ISignable {
    readonly onSigned: TypedEvent<{
        transaction: Transaction;
        signedBy: Address;
    }>;
    readonly onSent: TypedEvent<{
        transaction: Transaction;
    }>;
    readonly onStatusUpdated: TypedEvent<{
        transaction: Transaction;
    }>;
    readonly onStatusChanged: TypedEvent<{
        transaction: Transaction;
    }>;
    /**
     * The nonce of the transaction (the account sequence number of the sender).
     */
    private nonce;
    /**
     * The value to transfer.
     */
    private value;
    /**
     * The address of the sender.
     */
    private sender;
    /**
     * The address of the receiver.
     */
    private readonly receiver;
    /**
     * The gas price to be used.
     */
    private gasPrice;
    /**
     * The maximum amount of gas to be consumed when processing the transaction.
     */
    private gasLimit;
    /**
     * The payload of the transaction.
     */
    private readonly data;
    /**
     * The chain ID of the Network (e.g. "1" for Mainnet).
     */
    private readonly chainID;
    /**
     * The version, required by the Network in order to correctly interpret the contents of the transaction.
     */
    version: TransactionVersion;
    /**
     * The options field, useful for describing different settings available for transactions
     */
    options: TransactionOptions;
    /**
     * The signature.
     */
    private signature;
    /**
     * The transaction hash, also used as a transaction identifier.
     */
    private hash;
    /**
     * A (cached) representation of the transaction, as fetched from the API.
     */
    private asOnNetwork;
    /**
     * The last known status of the transaction, as fetched from the API.
     *
     * This only gets updated if {@link Transaction.awaitPending}, {@link Transaction.awaitExecuted} are called.
     */
    private status;
    /**
     * Creates a new Transaction object.
     */
    constructor({ nonce, value, receiver, sender, gasPrice, gasLimit, data, chainID, version, options }: {
        nonce?: Nonce;
        value?: Balance;
        receiver: Address;
        sender?: Address;
        gasPrice?: GasPrice;
        gasLimit?: GasLimit;
        data?: TransactionPayload;
        chainID?: ChainID;
        version?: TransactionVersion;
        options?: TransactionOptions;
    });
    getNonce(): Nonce;
    /**
     * Sets the account sequence number of the sender. Must be done prior signing.
     *
     * ```
     * await alice.sync(provider);
     *
     * let tx = new Transaction({
     *      value: Balance.egld(1),
     *      receiver: bob.address
     * });
     *
     * tx.setNonce(alice.nonce);
     * await alice.signer.sign(tx);
     * ```
     */
    setNonce(nonce: Nonce): void;
    getValue(): Balance;
    setValue(value: Balance): void;
    getSender(): Address;
    getReceiver(): Address;
    getGasPrice(): GasPrice;
    setGasPrice(gasPrice: GasPrice): void;
    getGasLimit(): GasLimit;
    setGasLimit(gasLimit: GasLimit): void;
    getData(): TransactionPayload;
    getChainID(): ChainID;
    getVersion(): TransactionVersion;
    getOptions(): TransactionOptions;
    doAfterPropertySetter(): void;
    getSignature(): Signature;
    getHash(): TransactionHash;
    getStatus(): TransactionStatus;
    /**
     * Serializes a transaction to a sequence of bytes, ready to be signed.
     * This function is called internally, by {@link Signer} objects.
     *
     * @param signedBy The address of the future signer
     */
    serializeForSigning(signedBy: Address): Buffer;
    /**
     * Converts the transaction object into a ready-to-serialize, plain JavaScript object.
     * This function is called internally within the signing procedure.
     *
     * @param sender The address of the sender (will be provided when called within the signing procedure)
     */
    toPlainObject(sender?: Address): any;
    /**
     * Applies the signature on the transaction.
     *
     * @param signature The signature, as computed by a {@link ISigner}.
     * @param signedBy The address of the signer.
     */
    applySignature(signature: Signature, signedBy: Address): void;
    /**
     * Broadcasts a transaction to the Network, via a {@link IProvider}.
     *
     * ```
     * let provider = new ProxyProvider("https://gateway.elrond.com");
     * // ... Prepare, sign the transaction, then:
     * await tx.send(provider);
     * await tx.awaitExecuted(provider);
     * ```
     */
    send(provider: IProvider): Promise<TransactionHash>;
    /**
     * Simulates a transaction on the Network, via a {@link IProvider}.
     */
    simulate(provider: IProvider): Promise<any>;
    /**
     * Converts a transaction to a ready-to-broadcast object.
     * Called internally by the {@link IProvider}.
     */
    toSendable(): any;
    /**
     * Fetches a representation of the transaction (whether pending, processed or finalized), as found on the Network.
     *
     * @param provider The provider to use
     * @param cacheLocally Whether to cache the response locally, on the transaction object
     * @param awaitNotarized Whether to wait for the transaction to be notarized
     * @param withResults Whether to wait for the transaction results
     */
    getAsOnNetwork(provider: IProvider, cacheLocally?: boolean, awaitNotarized?: boolean, withResults?: boolean): Promise<TransactionOnNetwork>;
    /**
     * Returns the cached representation of the transaction, as previously fetched using {@link Transaction.getAsOnNetwork}.
     */
    getAsOnNetworkCached(): TransactionOnNetwork;
    awaitSigned(): Promise<void>;
    awaitHashed(): Promise<void>;
    /**
     * Computes the current transaction fee based on the {@link NetworkConfig} and transaction properties
     * @param networkConfig {@link NetworkConfig}
     */
    computeFee(networkConfig: NetworkConfig): BigNumber;
    /**
     * Awaits for a transaction to reach its "pending" state - that is, for the transaction to be accepted in the mempool.
     * Performs polling against the provider, via a {@link TransactionWatcher}.
     */
    awaitPending(provider: IProvider): Promise<void>;
    /**
     * Awaits for a transaction to reach its "executed" state - that is, for the transaction to be processed (whether with success or with errors).
     * Performs polling against the provider, via a {@link TransactionWatcher}.
     */
    awaitExecuted(provider: IProvider): Promise<void>;
    private notifyStatusUpdate;
    awaitNotarized(provider: IProvider): Promise<void>;
}
/**
 * An abstraction for handling and computing transaction hashes.
 */
export declare class TransactionHash extends Hash {
    constructor(hash: string);
    /**
     * Computes the hash of a transaction.
     * Not yet implemented.
     */
    static compute(transaction: Transaction): TransactionHash;
}
/**
 * An abstraction for handling and interpreting the "status" field of a {@link Transaction}.
 */
export declare class TransactionStatus {
    /**
     * The raw status, as fetched from the Network.
     */
    readonly status: string;
    /**
     * Creates a new TransactionStatus object.
     */
    constructor(status: string);
    /**
     * Creates an unknown status.
     */
    static createUnknown(): TransactionStatus;
    /**
     * Returns whether the transaction is pending (e.g. in mempool).
     */
    isPending(): boolean;
    /**
     * Returns whether the transaction has been executed (not necessarily with success).
     */
    isExecuted(): boolean;
    /**
     * Returns whether the transaction has been executed successfully.
     */
    isSuccessful(): boolean;
    /**
     * Returns whether the transaction has been executed, but with a failure.
     */
    isFailed(): boolean;
    /**
     * Returns whether the transaction has been executed, but marked as invalid (e.g. due to "insufficient funds").
     */
    isInvalid(): boolean;
    toString(): string;
    valueOf(): string;
    equals(other: TransactionStatus): boolean;
}
