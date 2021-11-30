/**
 * This class exposes static methods that are useful for parsing ESDT transfer transactions
 */
export declare class EsdtHelpers {
    /**
     * This function will return the token identifier and the amount from a given data field for an ESDT transfer, or
     * an exception if something went wrong
     * @param dataField this field represents the data filed to extract esdt transfer data from
     * @throws ErrInvalidEsdtTransferDataField this function throws an ErrInvalidEsdtTransferDataField if the provided data field isn't meant to be an ESDT transfer
     * @return {tokenIdentifier, amount} this function returns a pair of token identifier and amount to transfer
     */
    static extractFieldsFromEsdtTransferDataField(dataField: string): {
        tokenIdentifier: string;
        amount: string;
    };
    /**
     * This function checks if the data field represents a valid ESDT transfer call
     * @param dataField this field represents the string to be checked if it would trigger an ESDT transfer call
     * @return true if the provided data field is meant to be an ESDT transfer
     */
    static isEsdtTransferTransaction(dataField: string): Boolean;
    /**
     * getTxFieldsForEsdtTransfer returns the needed value, gasLimit and data field (in string format) for sending an amount of ESDT token
     * @param tokenIdentifier this field represents the identifier of the token to transfer
     * @param amount this field represents the denominated amount of the token to send
     * @return {value, gasLimit, data} this function returns the value, the gas limit and the data field to use
     */
    static getTxFieldsForEsdtTransfer(tokenIdentifier: string, amount: string): {
        value: string;
        gasLimit: number;
        data: string;
    };
}
