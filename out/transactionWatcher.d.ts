import { IProvider } from "./interface";
import { TransactionHash, TransactionStatus } from "./transaction";
import * as errors from "./errors";
export declare type PredicateIsAwaitedStatus = (status: TransactionStatus) => boolean;
export declare type ActionOnStatusReceived = (status: TransactionStatus) => void;
/**
 * TransactionWatcher allows one to continuously watch (monitor), by means of polling, the status of a given transaction.
 */
export declare class TransactionWatcher {
    static DefaultPollingInterval: number;
    static DefaultTimeout: number;
    static NoopOnStatusReceived: (_: TransactionStatus) => void;
    private readonly hash;
    private readonly provider;
    private readonly pollingInterval;
    private readonly timeout;
    /**
     *
     * @param hash The hash of the transaction to watch
     * @param provider The provider to query the status from
     * @param pollingInterval The polling interval, in milliseconds
     * @param timeout The timeout, in milliseconds
     */
    constructor(hash: TransactionHash, provider: IProvider, pollingInterval?: number, timeout?: number);
    /**
     * Waits until the transaction reaches the "pending" status.
     */
    awaitPending(onStatusReceived?: ActionOnStatusReceived): Promise<void>;
    /**
      * Waits until the transaction reaches the "executed" status.
      */
    awaitExecuted(onStatusReceived?: ActionOnStatusReceived): Promise<void>;
    /**
     * Waits until the predicate over the transaction status evaluates to "true".
     * @param isAwaitedStatus A predicate over the status
     */
    awaitStatus(isAwaitedStatus: PredicateIsAwaitedStatus, onStatusReceived: ActionOnStatusReceived): Promise<void>;
    awaitNotarized(): Promise<void>;
    awaitConditionally<TData>(isSatisfied: (data: TData) => boolean, doFetch: () => Promise<TData>, onFetched: (data: TData) => void, createError: () => errors.Err): Promise<void>;
}
