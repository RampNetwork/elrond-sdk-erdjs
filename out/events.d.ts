import { Disposable } from "./interface";
/**
 * An interface that defines a Listener (an "Observer", in the context of the Observer pattern).
 */
export interface Listener<T> {
    (event: T): any;
}
/**
 * An event (a "Subject" in the context of the Observer pattern).
 * One or more {@link Listener} objects can register to this.
 *
 * Based on: https://basarat.gitbook.io/typescript/main-1/typed-event
 */
export declare class TypedEvent<T> {
    private listeners;
    private listenersOnce;
    /**
     * Registers a listener to this event.
     */
    on(listener: Listener<T>): Disposable;
    /**
     * Registers a one-time listener to this event.
     */
    once(listener: Listener<T>): void;
    /**
     * Unregisters a listener from this event.
     */
    off(listener: Listener<T>): void;
    /**
     * Emits an event (with a payload).
     */
    emit(event: T): void;
}
