"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsdtHelpers = void 0;
const scArgumentsParser_1 = require("./scArgumentsParser");
const errors_1 = require("./errors");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const constants_1 = require("./constants");
/**
 * This class exposes static methods that are useful for parsing ESDT transfer transactions
 */
class EsdtHelpers {
    /**
     * This function will return the token identifier and the amount from a given data field for an ESDT transfer, or
     * an exception if something went wrong
     * @param dataField this field represents the data filed to extract esdt transfer data from
     * @throws ErrInvalidEsdtTransferDataField this function throws an ErrInvalidEsdtTransferDataField if the provided data field isn't meant to be an ESDT transfer
     * @return {tokenIdentifier, amount} this function returns a pair of token identifier and amount to transfer
     */
    static extractFieldsFromEsdtTransferDataField(dataField) {
        if (!dataField.startsWith(constants_1.ESDT_TRANSFER_FUNCTION_NAME + "@")) {
            throw new errors_1.ErrInvalidEsdtTransferDataField();
        }
        let { args } = scArgumentsParser_1.ScArgumentsParser.parseSmartContractCallDataField(dataField);
        if (args.length != 2) {
            throw new errors_1.ErrInvalidEsdtTransferDataField();
        }
        let tokenIdentifier = args[0];
        let amount = new bignumber_js_1.default(args[1], 16).toString(10);
        return {
            tokenIdentifier: tokenIdentifier,
            amount: amount
        };
    }
    /**
     * This function checks if the data field represents a valid ESDT transfer call
     * @param dataField this field represents the string to be checked if it would trigger an ESDT transfer call
     * @return true if the provided data field is meant to be an ESDT transfer
     */
    static isEsdtTransferTransaction(dataField) {
        if (!dataField.startsWith(constants_1.ESDT_TRANSFER_FUNCTION_NAME + "@")) {
            return false;
        }
        let args;
        try {
            args = scArgumentsParser_1.ScArgumentsParser.parseSmartContractCallDataField(dataField).args;
        }
        catch (e) {
            return false;
        }
        return args.length === 2;
    }
    /**
     * getTxFieldsForEsdtTransfer returns the needed value, gasLimit and data field (in string format) for sending an amount of ESDT token
     * @param tokenIdentifier this field represents the identifier of the token to transfer
     * @param amount this field represents the denominated amount of the token to send
     * @return {value, gasLimit, data} this function returns the value, the gas limit and the data field to use
     */
    static getTxFieldsForEsdtTransfer(tokenIdentifier, amount) {
        const encodedAmount = new bignumber_js_1.default(amount, 10).toString(16);
        const txDataField = [constants_1.ESDT_TRANSFER_FUNCTION_NAME, tokenIdentifier, encodedAmount].join("@");
        return {
            value: constants_1.ESDT_TRANSFER_VALUE,
            gasLimit: constants_1.ESDT_TRANSFER_GAS_LIMIT,
            data: txDataField
        };
    }
}
exports.EsdtHelpers = EsdtHelpers;
//# sourceMappingURL=esdtHelpers.js.map