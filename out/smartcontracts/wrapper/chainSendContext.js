"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainSendContext = void 0;
class ChainSendContext {
    constructor(context) {
        this.context = context;
    }
    sender(caller) {
        this.context.sender(caller);
        return this;
    }
    gas(gas) {
        this.context.gas(gas);
        return this;
    }
    autoGas(baseGas) {
        this.context.autoGas(baseGas);
        return this;
    }
    value(value) {
        this.context.value(value);
        return this;
    }
    logger(logger) {
        this.context.logger(logger);
        return this;
    }
    getProvider() {
        return this.context.getProvider();
    }
}
exports.ChainSendContext = ChainSendContext;
//# sourceMappingURL=chainSendContext.js.map