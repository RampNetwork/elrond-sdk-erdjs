"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendContext = void 0;
const networkParams_1 = require("../../networkParams");
const strictChecker_1 = require("../strictChecker");
const errors_1 = require("../../errors");
const systemWrapper_1 = require("./systemWrapper");
/**
 * Stores contextual information which is needed when preparing a transaction.
 */
class SendContext {
    constructor(provider) {
        this.sender_ = null;
        this.provider_ = provider;
        this.gas_ = null;
        this.logger_ = null;
        this.value_ = null;
        this.checker = new strictChecker_1.StrictChecker();
    }
    provider(provider) {
        this.provider_ = provider;
        return this;
    }
    sender(sender) {
        this.sender_ = sender;
        return this;
    }
    gas(gas) {
        this.gas_ = new networkParams_1.GasLimit(gas);
        return this;
    }
    autoGas(baseGas) {
        return this.gas(systemWrapper_1.getGasFromValue(baseGas, this.value_));
    }
    logger(logger) {
        this.logger_ = logger;
        return this;
    }
    value(value) {
        this.value_ = value;
        return this;
    }
    getAndResetValue() {
        let value = this.value_;
        this.value_ = null;
        return value;
    }
    getSender() {
        if (this.sender_) {
            return this.sender_;
        }
        throw new errors_1.Err("sender not set");
    }
    getSenderOptional() {
        return this.sender_;
    }
    getProvider() {
        return this.provider_;
    }
    getGasLimit() {
        if (this.gas_) {
            return this.gas_;
        }
        throw new errors_1.Err("gas limit not set");
    }
    getLogger() {
        return this.logger_;
    }
}
exports.SendContext = SendContext;
//# sourceMappingURL=sendContext.js.map