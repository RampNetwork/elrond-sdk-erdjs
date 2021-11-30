"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = exports.TransactionOnNetworkType = exports.TransactionOnNetwork = void 0;
const address_1 = require("./address");
const balance_1 = require("./balance");
const networkParams_1 = require("./networkParams");
const nonce_1 = require("./nonce");
const signature_1 = require("./signature");
const transactionPayload_1 = require("./transactionPayload");
const hash_1 = require("./hash");
const transaction_1 = require("./transaction");
const smartContractResults_1 = require("./smartcontracts/smartContractResults");
/**
 * A plain view of a transaction, as queried from the Network.
 */
class TransactionOnNetwork {
    constructor(init) {
        this.type = new TransactionOnNetworkType();
        this.nonce = new nonce_1.Nonce(0);
        this.round = 0;
        this.epoch = 0;
        this.value = balance_1.Balance.Zero();
        this.receiver = new address_1.Address();
        this.sender = new address_1.Address();
        this.gasPrice = new networkParams_1.GasPrice(0);
        this.gasLimit = new networkParams_1.GasLimit(0);
        this.data = new transactionPayload_1.TransactionPayload();
        this.signature = signature_1.Signature.empty();
        this.status = transaction_1.TransactionStatus.createUnknown();
        this.hyperblockNonce = new nonce_1.Nonce(0);
        this.hyperblockHash = hash_1.Hash.empty();
        this.receipt = new Receipt();
        this.smartContractResults = smartContractResults_1.SmartContractResults.empty();
        Object.assign(this, init);
    }
    static fromHttpResponse(response) {
        let transactionOnNetwork = new TransactionOnNetwork();
        transactionOnNetwork.type = new TransactionOnNetworkType(response.type || "");
        transactionOnNetwork.nonce = new nonce_1.Nonce(response.nonce || 0);
        transactionOnNetwork.round = response.round;
        transactionOnNetwork.epoch = response.epoch || 0;
        transactionOnNetwork.value = balance_1.Balance.fromString(response.value);
        transactionOnNetwork.sender = address_1.Address.fromBech32(response.sender);
        transactionOnNetwork.receiver = address_1.Address.fromBech32(response.receiver);
        transactionOnNetwork.gasPrice = new networkParams_1.GasPrice(response.gasPrice);
        transactionOnNetwork.gasLimit = new networkParams_1.GasLimit(response.gasLimit);
        transactionOnNetwork.data = transactionPayload_1.TransactionPayload.fromEncoded(response.data);
        transactionOnNetwork.status = new transaction_1.TransactionStatus(response.status);
        transactionOnNetwork.hyperblockNonce = new nonce_1.Nonce(response.hyperblockNonce || 0);
        transactionOnNetwork.hyperblockHash = new hash_1.Hash(response.hyperblockHash);
        transactionOnNetwork.receipt = Receipt.fromHttpResponse(response.receipt || {});
        transactionOnNetwork.smartContractResults = smartContractResults_1.SmartContractResults.fromHttpResponse(response.smartContractResults || []);
        return transactionOnNetwork;
    }
    getReceipt() {
        return this.receipt;
    }
    getSmartContractResults() {
        return this.smartContractResults;
    }
}
exports.TransactionOnNetwork = TransactionOnNetwork;
/**
 * Not yet implemented.
 */
class TransactionOnNetworkType {
    constructor(value) {
        this.value = value || "unknown";
    }
}
exports.TransactionOnNetworkType = TransactionOnNetworkType;
class Receipt {
    constructor() {
        this.value = balance_1.Balance.Zero();
        this.sender = new address_1.Address();
        this.message = "";
        this.hash = transaction_1.TransactionHash.empty();
    }
    static fromHttpResponse(response) {
        let receipt = new Receipt();
        receipt.value = balance_1.Balance.fromString(response.value);
        receipt.sender = new address_1.Address(response.sender);
        receipt.message = response.data;
        receipt.hash = new transaction_1.TransactionHash(response.txHash);
        return receipt;
    }
}
exports.Receipt = Receipt;
//# sourceMappingURL=transactionOnNetwork.js.map