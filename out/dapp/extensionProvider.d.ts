import { SignableMessage } from "../signableMessage";
import { Transaction } from "../transaction";
import { IDappProvider } from "./interface";
declare global {
    interface Window {
        elrondWallet: {
            extensionId: string;
        };
    }
}
interface IExtensionAccount {
    address: string;
    name?: string;
    signature?: string;
}
export declare class ExtensionProvider implements IDappProvider {
    private popupName;
    private extensionId;
    private extensionURL;
    private extensionPopupWindow;
    account: IExtensionAccount;
    private initialized;
    private static _instance;
    constructor();
    static getInstance(): ExtensionProvider;
    setAddress(address: string): ExtensionProvider;
    init(): Promise<boolean>;
    login(options?: {
        callbackUrl?: string;
        token?: string;
    }): Promise<string>;
    logout(): Promise<boolean>;
    getAddress(): Promise<string>;
    isInitialized(): boolean;
    isConnected(): Promise<boolean>;
    sendTransaction(transaction: Transaction): Promise<Transaction>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signTransactions(transactions: Array<Transaction>): Promise<Array<Transaction>>;
    signMessage(message: SignableMessage): Promise<SignableMessage>;
    private openExtensionPopup;
    private startBgrMsgChannel;
    private startExtMsgChannel;
    private handleExtResponseErr;
}
export {};
