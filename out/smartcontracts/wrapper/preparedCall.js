"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreparedCall = void 0;
/**
 * Keeps track of part of the context necessary for making a call to a smart contract method.
 */
class PreparedCall {
    constructor(receiver, egldValue, formattedCall) {
        this.receiver = receiver;
        this.egldValue = egldValue;
        this.formattedCall = formattedCall;
    }
    wrap(wrappedCall) {
        wrappedCall.interpretingEndpoint = this.formattedCall.interpretingEndpoint;
        this.formattedCall = wrappedCall;
    }
}
exports.PreparedCall = PreparedCall;
//# sourceMappingURL=preparedCall.js.map