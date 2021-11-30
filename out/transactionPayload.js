"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPayload = void 0;
const transactionPayloadBuilders_1 = require("./smartcontracts/transactionPayloadBuilders");
/**
 * The "data" field of a {@link Transaction}, as an immutable object.
 */
class TransactionPayload {
    /**
     * Creates a TransactionPayload from a utf-8 string or from a buffer.
     */
    constructor(data) {
        this.data = Buffer.from(data || []);
    }
    /**
     * Creates a TransactionPayload from a base-64 encoded string.
     */
    static fromEncoded(encoded) {
        if (!encoded) {
            return new TransactionPayload("");
        }
        let decoded = Buffer.from(encoded, "base64").toString();
        return new TransactionPayload(decoded);
    }
    /**
     * Returns whether the "data" is void.
     */
    isEmpty() {
        return this.data.length == 0;
    }
    /**
     * Returns the base-64 representation of the data.
     */
    encoded() {
        return this.data.toString("base64");
    }
    /**
     * Returns the data as a buffer.
     */
    valueOf() {
        return this.data;
    }
    toString() {
        return this.data.toString();
    }
    getEncodedArguments() {
        return this.toString().split("@");
    }
    getRawArguments() {
        return this.getEncodedArguments().map(argument => Buffer.from(argument, "hex"));
    }
    /**
     * Returns the length of the data.
     */
    length() {
        return Buffer.from(this.data).length;
    }
    /**
     * Returns a new builder, to be used for contract deploy transactions.
     */
    static contractDeploy() {
        return new transactionPayloadBuilders_1.ContractDeployPayloadBuilder();
    }
    /**
     * Returns a new builder, to be used for contract upgrade transactions.
     */
    static contractUpgrade() {
        return new transactionPayloadBuilders_1.ContractUpgradePayloadBuilder();
    }
    /**
     * Returns a new builder, to be used for contract call transactions.
     */
    static contractCall() {
        return new transactionPayloadBuilders_1.ContractCallPayloadBuilder();
    }
}
exports.TransactionPayload = TransactionPayload;
//# sourceMappingURL=transactionPayload.js.map