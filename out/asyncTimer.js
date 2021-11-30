"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTimer = void 0;
const errors = __importStar(require("./errors"));
const errors_1 = require("./errors");
const logger_1 = require("./logger");
/*
 * AsyncTimer is an async-friendly abstraction that wraps JavaScript's setTimeout() and clearTimeout().
 */
class AsyncTimer {
    /**
     * Creates an AsyncTimer.
     */
    constructor(name) {
        this.timeoutHandle = null;
        this.rejectionFunc = null;
        this.name = name;
        this.correlationTag = 0;
    }
    /**
     * Starts the timer.
     * @param timeout The time (in milliseconds) to wait until resolving the promise.
     */
    start(timeout) {
        if (this.timeoutHandle) {
            throw new errors.ErrAsyncTimerAlreadyRunning();
        }
        this.correlationTag++;
        logger_1.Logger.trace(`AsyncTimer[${this.name}'${this.correlationTag}].start()`);
        return new Promise((resolve, reject) => {
            this.rejectionFunc = reject;
            let timeoutCallback = () => {
                this.rejectionFunc = null;
                this.stop();
                resolve();
            };
            this.timeoutHandle = setTimeout(timeoutCallback, timeout);
        });
    }
    /**
     * Aborts the timer: rejects the promise (if any) and stops the timer.
     */
    abort() {
        logger_1.Logger.trace(`AsyncTimer[${this.name}'${this.correlationTag}].abort()`);
        if (this.rejectionFunc) {
            this.rejectionFunc(new errors_1.ErrAsyncTimerAborted());
            this.rejectionFunc = null;
        }
        this.stop();
    }
    /**
     * Stops the timer.
     */
    stop() {
        if (this.isStopped()) {
            return;
        }
        logger_1.Logger.trace(`AsyncTimer[${this.name}'${this.correlationTag}].stop()`);
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = null;
        }
    }
    /**
     * Returns whether the timer is stopped.
     */
    isStopped() {
        return this.timeoutHandle ? false : true;
    }
}
exports.AsyncTimer = AsyncTimer;
//# sourceMappingURL=asyncTimer.js.map