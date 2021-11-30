import { Address } from "../address";
import { ISignable, ISigner } from "../interface";
import { UserSecretKey } from "./userKeys";
/**
 * ed25519 signer
 */
export declare class UserSigner implements ISigner {
    private readonly secretKey;
    constructor(secretKey: UserSecretKey);
    static fromWallet(keyFileObject: any, password: string): ISigner;
    static fromPem(text: string, index?: number): UserSigner;
    /**
     * Signs a message.
     * @param signable the message to be signed (e.g. a {@link Transaction}).
     */
    sign(signable: ISignable): Promise<void>;
    private trySign;
    /**
     * Gets the address of the signer.
     */
    getAddress(): Address;
}
