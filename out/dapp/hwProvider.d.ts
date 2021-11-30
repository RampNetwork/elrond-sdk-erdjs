import { IHWElrondApp, IHWProvider } from "./interface";
import { IProvider } from "../interface";
import { Transaction } from "../transaction";
import { SignableMessage } from "../signableMessage";
export declare class HWProvider implements IHWProvider {
    provider: IProvider;
    hwApp?: IHWElrondApp;
    addressIndex: number;
    constructor(httpProvider: IProvider);
    /**
     * Creates transport and initialises ledger app.
     */
    init(): Promise<boolean>;
    /**
     * Returns true if init() was previously called successfully
     */
    isInitialized(): boolean;
    /**
     * Mocked function, returns isInitialized as an async function
     */
    isConnected(): Promise<boolean>;
    /**
     * Performs a login request by setting the selected index in Ledger and returning that address
     */
    login(options?: {
        addressIndex?: number;
    }): Promise<string>;
    getAccounts(page?: number, pageSize?: number): Promise<string[]>;
    /**
     * Mocks a logout request by returning true
     */
    logout(): Promise<boolean>;
    /**
     * Fetches current selected ledger address
     */
    getAddress(): Promise<string>;
    /**
     * Signs and sends a transaction. Returns the transaction hash
     * @param transaction
     */
    sendTransaction(transaction: Transaction): Promise<Transaction>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: SignableMessage): Promise<SignableMessage>;
    private shouldSignUsingHash;
    private getCurrentAddress;
}
