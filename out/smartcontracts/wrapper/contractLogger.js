"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractLogger = void 0;
/**
 * Provides a simple interface in order to easily call or query the smart contract's methods.
 */
class ContractLogger {
    synchronizedNetworkConfig(networkConfig) {
        console.log(`Synchronized network config - chainID: ${networkConfig.ChainID.valueOf()}`);
    }
    transactionCreated(transaction) {
        console.log(`Tx ${transaction.getHash()} created. Sending...`);
    }
    deployComplete(transaction, smartContractResults, smartContractAddress) {
        logReturnMessages(transaction, smartContractResults);
        console.log(`done. (address: ${smartContractAddress.bech32()} )`);
    }
    transactionSent(_transaction) {
        console.log(`awaiting results...`);
    }
    transactionComplete(_result, _resultData, transaction, smartContractResults) {
        logReturnMessages(transaction, smartContractResults);
        console.log(`done.`);
    }
    queryCreated(_query) {
        console.log(`Query created. Sending...`);
    }
    queryComplete(_result, _response) {
        console.log(`done.`);
    }
}
exports.ContractLogger = ContractLogger;
function logReturnMessages(transaction, smartContractResults) {
    let immediate = smartContractResults.getImmediate();
    logSmartContractResultIfMessage("(immediate)", transaction, immediate);
    let resultingCalls = smartContractResults.getResultingCalls();
    for (let i in resultingCalls) {
        logSmartContractResultIfMessage("(resulting call)", transaction, resultingCalls[i]);
    }
}
function logSmartContractResultIfMessage(info, _transaction, smartContractResult) {
    if (smartContractResult.returnMessage) {
        console.log(`Return message ${info} message: ${smartContractResult.returnMessage}`);
    }
}
//# sourceMappingURL=contractLogger.js.map