import { IDappProvider } from "./interface";
import { Transaction } from "../transaction";
import { SignableMessage } from "../signableMessage";
export declare class WalletProvider implements IDappProvider {
    walletUrl: string;
    /**
     * Creates a new WalletProvider
     * @param walletURL
     */
    constructor(walletURL?: string);
    /**
     * Waits for the wallet iframe to ping that it has been initialised
     */
    init(): Promise<boolean>;
    /**
     * Returns if the wallet iframe is up and running
     */
    isInitialized(): boolean;
    /**
     * Unlike isInitialized, isConnected returns true if the user alredy went through the login process
     *  and has the wallet session active
     */
    isConnected(): Promise<boolean>;
    /**
     * Fetches the login hook url and redirects the client to the wallet login.
     */
    login(options?: {
        callbackUrl?: string;
        token?: string;
    }): Promise<string>;
    /**
    * Fetches the logout hook url and redirects the client to the wallet logout.
    */
    logout(options?: {
        callbackUrl?: string;
    }): Promise<boolean>;
    /**
     * Returns currently connected address. Empty string if not connected
     */
    getAddress(): Promise<string>;
    /**
     * Packs a {@link Transaction} and fetches correct redirect URL from the wallet API. Then redirects
     *   the client to the send transaction hook
     * @param transaction
     * @param options
     */
    sendTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<Transaction>;
    /**
     * Packs an array of {$link Transaction} and redirects to the correct transaction sigining hook
     *
     * @param transactions
     * @param options
     */
    signTransactions(transactions: Transaction[], options?: {
        callbackUrl?: string;
    }): Promise<Transaction[]>;
    /**
     * Packs a {@link Transaction} and fetches correct redirect URL from the wallet API. Then redirects
     *   the client to the sign transaction hook
     * @param transaction
     * @param options
     */
    signTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<Transaction>;
    getTransactionsFromWalletUrl(): Transaction[];
    /**
     * Method will be available once the ElrondWallet hook will be implemented
     * @param _
     */
    signMessage(_: SignableMessage): Promise<SignableMessage>;
    static isTxSignReturnSuccess(urlParams: any): boolean;
    static getTxSignReturnValue(urlParams: any): Transaction[];
    static prepareWalletTransaction(transaction: Transaction): any;
    private buildTransactionUrl;
    private baseWalletUrl;
}
