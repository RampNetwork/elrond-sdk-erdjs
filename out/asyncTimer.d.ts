export declare class AsyncTimer {
    private readonly name;
    private timeoutHandle;
    private rejectionFunc;
    private correlationTag;
    /**
     * Creates an AsyncTimer.
     */
    constructor(name: string);
    /**
     * Starts the timer.
     * @param timeout The time (in milliseconds) to wait until resolving the promise.
     */
    start(timeout: number): Promise<void>;
    /**
     * Aborts the timer: rejects the promise (if any) and stops the timer.
     */
    abort(): void;
    /**
     * Stops the timer.
     */
    stop(): void;
    /**
     * Returns whether the timer is stopped.
     */
    isStopped(): boolean;
}
