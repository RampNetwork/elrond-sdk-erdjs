"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScArgumentsParser = void 0;
const errors_1 = require("./errors");
/**
 * Class with static methods useful for fetching and checking arguments from a transaction's data field that should trigger
 * a smart contract call
 */
class ScArgumentsParser {
    /**
     * Returns an array containing all the arguments from a data field representing a smart contract call
     * @param dataField this field represents the data filed to extract arguments from
     * @return {functionName, args} returns the function name and an array containing all the smart contract call arguments
     * @throws ErrInvalidScCallDataField the function returns an ErrInvalidScCallDataField exception if the input isn't a smart contract call valid input
     */
    static parseSmartContractCallDataField(dataField) {
        if (!this.isValidSmartContractCallDataField(dataField)) {
            throw new errors_1.ErrInvalidScCallDataField(dataField);
        }
        let args = new Array();
        let items = dataField.split("@");
        if (items.length === 0) {
            return {
                functionName: dataField,
                args: new Array(),
            };
        }
        for (let i = 1; i < items.length; i++) {
            args.push(items[i]);
        }
        return {
            functionName: items[0],
            args: args,
        };
    }
    /**
     * Returns a Boolean value representing if the input data field is a valid smart contract call input
     * @param dataField this field represents the input to check
     */
    static isValidSmartContractCallDataField(dataField) {
        let items = dataField.split("@");
        if (items.length === 0) {
            return true; // only function call, no arguments
        }
        for (let i = 1; i < items.length; i++) {
            if (!this.isValidScArgument(items[i])) {
                return false;
            }
        }
        return true;
    }
    /**
     *
     * @param input input represents the input argument to check
     * @return true if the provided argument resembles a valid smart contract call argument
     */
    static isValidScArgument(input) {
        if (input.length % 2 != 0) {
            return false;
        }
        for (let i = 0; i < input.length; i++) {
            if (!this.validHexChars.includes(input[i])) {
                return false;
            }
        }
        return true;
    }
}
exports.ScArgumentsParser = ScArgumentsParser;
ScArgumentsParser.validHexChars = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
//# sourceMappingURL=scArgumentsParser.js.map