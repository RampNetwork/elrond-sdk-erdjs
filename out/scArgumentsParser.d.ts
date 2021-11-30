/**
 * Class with static methods useful for fetching and checking arguments from a transaction's data field that should trigger
 * a smart contract call
 */
export declare class ScArgumentsParser {
    private static validHexChars;
    /**
     * Returns an array containing all the arguments from a data field representing a smart contract call
     * @param dataField this field represents the data filed to extract arguments from
     * @return {functionName, args} returns the function name and an array containing all the smart contract call arguments
     * @throws ErrInvalidScCallDataField the function returns an ErrInvalidScCallDataField exception if the input isn't a smart contract call valid input
     */
    static parseSmartContractCallDataField(dataField: string): {
        functionName: string;
        args: Array<string>;
    };
    /**
     * Returns a Boolean value representing if the input data field is a valid smart contract call input
     * @param dataField this field represents the input to check
     */
    static isValidSmartContractCallDataField(dataField: string): Boolean;
    /**
     *
     * @param input input represents the input argument to check
     * @return true if the provided argument resembles a valid smart contract call argument
     */
    static isValidScArgument(input: string): Boolean;
}
