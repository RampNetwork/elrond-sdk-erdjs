import WalletClient from "@walletconnect/client";
import { IProvider } from "../interface";
import { Transaction } from "../transaction";
import { IDappProvider } from "./interface";
import { SignableMessage } from "../signableMessage";
interface IClientConnect {
    onClientLogin: () => void;
    onClientLogout(): void;
}
export declare class WalletConnectProvider implements IDappProvider {
    provider: IProvider;
    walletConnectBridge: string;
    address: string;
    signature: string;
    walletConnector: WalletClient | undefined;
    private onClientConnect;
    constructor(httpProvider: IProvider, walletConnectBridge: string | undefined, onClientConnect: IClientConnect);
    /**
     * Initiates wallet connect client.
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
     *
     */
    login(): Promise<string>;
    /**
     * Mocks a logout request by returning true
     */
    logout(): Promise<boolean>;
    /**
     * Fetches the wallet connect address
     */
    getAddress(): Promise<string>;
    /**
     * Fetches the wallet connect signature
     */
    getSignature(): Promise<string>;
    /**
     * Signs and sends a transaction. Returns the transaction hash
     * @param transaction
     */
    sendTransaction(transaction: Transaction): Promise<Transaction>;
    /**
     * Method will be available once the Maiar wallet connect hook is implemented
     * @param _
     */
    signMessage(_: SignableMessage): Promise<SignableMessage>;
    /**
     * Signs a transaction and returns it
     * @param transaction
     */
    signTransaction(transaction: Transaction): Promise<Transaction>;
    /**
     * Signs an array of transactions and returns it
     * @param transactions
     */
    signTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    /**
     * Sends a custom method and params and returns the response object
     */
    sendCustomMessage({ method, params, }: {
        method: string;
        params: any;
    }): Promise<any>;
    private onConnect;
    private onDisconnect;
    private loginAccount;
    private prepareWalletConnectMessage;
    private addressIsValid;
}
export {};
