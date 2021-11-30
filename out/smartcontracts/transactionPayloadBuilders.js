"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCallPayloadBuilder = exports.ContractUpgradePayloadBuilder = exports.ContractDeployPayloadBuilder = exports.ArwenVirtualMachine = void 0;
const transactionPayload_1 = require("../transactionPayload");
const utils_1 = require("../utils");
const codeMetadata_1 = require("./codeMetadata");
const argSerializer_1 = require("./argSerializer");
exports.ArwenVirtualMachine = "0500";
/**
 * A builder for {@link TransactionPayload} objects, to be used for Smart Contract deployment transactions.
 */
class ContractDeployPayloadBuilder {
    constructor() {
        this.code = null;
        this.codeMetadata = new codeMetadata_1.CodeMetadata();
        this.arguments = [];
    }
    /**
     * Sets the code of the Smart Contract.
     */
    setCode(code) {
        this.code = code;
        return this;
    }
    /**
     * Sets the code metadata of the Smart Contract.
     */
    setCodeMetadata(codeMetadata) {
        this.codeMetadata = codeMetadata;
        return this;
    }
    /**
     * Adds constructor (`init`) arguments.
     */
    addInitArg(arg) {
        this.arguments.push(arg);
        return this;
    }
    /**
     * Sets constructor (`init`) arguments.
     */
    setInitArgs(args) {
        this.arguments = args;
        return this;
    }
    /**
     * Builds the {@link TransactionPayload}.
     */
    build() {
        utils_1.guardValueIsSet("code", this.code);
        let code = this.code.toString();
        let codeMetadata = this.codeMetadata.toString();
        let data = `${code}@${exports.ArwenVirtualMachine}@${codeMetadata}`;
        data = appendArgumentsToString(data, this.arguments);
        return new transactionPayload_1.TransactionPayload(data);
    }
}
exports.ContractDeployPayloadBuilder = ContractDeployPayloadBuilder;
/**
 * A builder for {@link TransactionPayload} objects, to be used for Smart Contract upgrade transactions.
 */
class ContractUpgradePayloadBuilder {
    constructor() {
        this.code = null;
        this.codeMetadata = new codeMetadata_1.CodeMetadata();
        this.arguments = [];
    }
    /**
     * Sets the code of the Smart Contract.
     */
    setCode(code) {
        this.code = code;
        return this;
    }
    /**
     * Sets the code metadata of the Smart Contract.
     */
    setCodeMetadata(codeMetadata) {
        this.codeMetadata = codeMetadata;
        return this;
    }
    /**
     * Adds upgrade (`init`) arguments.
     */
    addInitArg(arg) {
        this.arguments.push(arg);
        return this;
    }
    /**
     * Sets upgrade (`init`) arguments.
     */
    setInitArgs(args) {
        this.arguments = args;
        return this;
    }
    /**
     * Builds the {@link TransactionPayload}.
     */
    build() {
        utils_1.guardValueIsSet("code", this.code);
        let code = this.code.toString();
        let codeMetadata = this.codeMetadata.toString();
        let data = `upgradeContract@${code}@${codeMetadata}`;
        data = appendArgumentsToString(data, this.arguments);
        return new transactionPayload_1.TransactionPayload(data);
    }
}
exports.ContractUpgradePayloadBuilder = ContractUpgradePayloadBuilder;
/**
 * A builder for {@link TransactionPayload} objects, to be used for Smart Contract execution transactions.
 */
class ContractCallPayloadBuilder {
    constructor() {
        this.contractFunction = null;
        this.arguments = [];
    }
    /**
     * Sets the function to be called (executed).
     */
    setFunction(contractFunction) {
        this.contractFunction = contractFunction;
        return this;
    }
    /**
     * Adds a function argument.
     */
    addArg(arg) {
        this.arguments.push(arg);
        return this;
    }
    /**
     * Sets the function arguments.
     */
    setArgs(args) {
        this.arguments = args;
        return this;
    }
    /**
     * Builds the {@link TransactionPayload}.
     */
    build() {
        utils_1.guardValueIsSet("calledFunction", this.contractFunction);
        let data = this.contractFunction.name;
        data = appendArgumentsToString(data, this.arguments);
        return new transactionPayload_1.TransactionPayload(data);
    }
}
exports.ContractCallPayloadBuilder = ContractCallPayloadBuilder;
function appendArgumentsToString(to, values) {
    if (values.length == 0) {
        return to;
    }
    let argumentsString = new argSerializer_1.ArgSerializer().valuesToString(values);
    return `${to}@${argumentsString}`;
}
//# sourceMappingURL=transactionPayloadBuilders.js.map