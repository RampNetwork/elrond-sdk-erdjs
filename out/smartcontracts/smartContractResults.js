"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedResult = exports.SmartContractResultItem = exports.SmartContractResults = void 0;
const address_1 = require("../address");
const balance_1 = require("../balance");
const hash_1 = require("../hash");
const networkParams_1 = require("../networkParams");
const nonce_1 = require("../nonce");
const transaction_1 = require("../transaction");
const argSerializer_1 = require("./argSerializer");
const returnCode_1 = require("./returnCode");
const result_1 = require("./result");
class SmartContractResults {
    constructor(items) {
        this.items = [];
        this.immediate = new TypedResult();
        this.resultingCalls = [];
        this.items = items;
        if (this.items.length > 0) {
            let immediateResult = this.findImmediateResult();
            if (immediateResult) {
                this.immediate = immediateResult;
            }
            this.resultingCalls = this.findResultingCalls();
        }
    }
    static empty() {
        return new SmartContractResults([]);
    }
    static fromHttpResponse(smartContractResults) {
        let items = (smartContractResults || []).map((item) => SmartContractResultItem.fromHttpResponse(item));
        return new SmartContractResults(items);
    }
    findImmediateResult() {
        let immediateItem = this.items.filter(item => isImmediateResult(item))[0];
        if (immediateItem) {
            return new TypedResult(immediateItem);
        }
        return undefined;
    }
    findResultingCalls() {
        let otherItems = this.items.filter(item => !isImmediateResult(item));
        let resultingCalls = otherItems.map(item => new TypedResult(item));
        return resultingCalls;
    }
    getImmediate() {
        return this.immediate;
    }
    getResultingCalls() {
        return this.resultingCalls;
    }
    getAllResults() {
        return this.items.map(item => new TypedResult(item));
    }
}
exports.SmartContractResults = SmartContractResults;
function isImmediateResult(item) {
    return item.nonce.valueOf() != 0;
}
class SmartContractResultItem {
    constructor() {
        this.hash = hash_1.Hash.empty();
        this.nonce = new nonce_1.Nonce(0);
        this.value = balance_1.Balance.Zero();
        this.receiver = new address_1.Address();
        this.sender = new address_1.Address();
        this.data = "";
        this.previousHash = hash_1.Hash.empty();
        this.originalHash = hash_1.Hash.empty();
        this.gasLimit = new networkParams_1.GasLimit(0);
        this.gasPrice = new networkParams_1.GasPrice(0);
        this.callType = 0;
        this.returnMessage = "";
    }
    static fromHttpResponse(response) {
        let item = new SmartContractResultItem();
        item.hash = new transaction_1.TransactionHash(response.hash);
        item.nonce = new nonce_1.Nonce(response.nonce || 0);
        item.value = balance_1.Balance.fromString(response.value);
        item.receiver = new address_1.Address(response.receiver);
        item.sender = new address_1.Address(response.sender);
        item.data = response.data || "";
        item.previousHash = new transaction_1.TransactionHash(response.prevTxHash);
        item.originalHash = new transaction_1.TransactionHash(response.originalTxHash);
        item.gasLimit = new networkParams_1.GasLimit(response.gasLimit);
        item.gasPrice = new networkParams_1.GasPrice(response.gasPrice);
        item.callType = response.callType;
        item.returnMessage = response.returnMessage;
        return item;
    }
    getDataTokens() {
        return new argSerializer_1.ArgSerializer().stringToBuffers(this.data);
    }
}
exports.SmartContractResultItem = SmartContractResultItem;
class TypedResult extends SmartContractResultItem {
    constructor(init) {
        super();
        Object.assign(this, init);
    }
    assertSuccess() {
        result_1.Result.assertSuccess(this);
    }
    isSuccess() {
        return this.getReturnCode().isSuccess();
    }
    getReturnCode() {
        let tokens = this.getDataTokens();
        if (tokens.length < 2) {
            return returnCode_1.ReturnCode.None;
        }
        let returnCodeToken = tokens[1];
        return returnCode_1.ReturnCode.fromBuffer(returnCodeToken);
    }
    outputUntyped() {
        this.assertSuccess();
        // Skip the first 2 SCRs (eg. the @6f6b from @6f6b@2b).
        return this.getDataTokens().slice(2);
    }
    setEndpointDefinition(endpointDefinition) {
        this.endpointDefinition = endpointDefinition;
    }
    getEndpointDefinition() {
        return this.endpointDefinition;
    }
    getReturnMessage() {
        return this.returnMessage;
    }
    outputTyped() {
        return result_1.Result.outputTyped(this);
    }
    unpackOutput() {
        return result_1.Result.unpackOutput(this);
    }
}
exports.TypedResult = TypedResult;
//# sourceMappingURL=smartContractResults.js.map