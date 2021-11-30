"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedEvent = void 0;
/**
 * An event (a "Subject" in the context of the Observer pattern).
 * One or more {@link Listener} objects can register to this.
 *
 * Based on: https://basarat.gitbook.io/typescript/main-1/typed-event
 */
class TypedEvent {
    constructor() {
        this.listeners = [];
        this.listenersOnce = [];
    }
    /**
     * Registers a listener to this event.
     */
    on(listener) {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }
    /**
     * Registers a one-time listener to this event.
     */
    once(listener) {
        this.listenersOnce.push(listener);
    }
    /**
     * Unregisters a listener from this event.
     */
    off(listener) {
        var callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) {
            this.listeners.splice(callbackIndex, 1);
        }
    }
    /**
     * Emits an event (with a payload).
     */
    emit(event) {
        // Notify all listeners
        this.listeners.forEach((listener) => listener(event));
        // Notify (then clear) "once" listeners
        this.listenersOnce.forEach((listener) => listener(event));
        this.listenersOnce = [];
    }
}
exports.TypedEvent = TypedEvent;
//# sourceMappingURL=events.js.map