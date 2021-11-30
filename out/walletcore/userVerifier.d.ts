import { IVerifiable, IVerifier } from "../interface";
import { Address } from "../address";
import { UserPublicKey } from "./userKeys";
/**
 * ed25519 signature verification
 */
export declare class UserVerifier implements IVerifier {
    publicKey: UserPublicKey;
    constructor(publicKey: UserPublicKey);
    static fromAddress(address: Address): IVerifier;
    /**
     * Verify a message's signature.
     * @param message the message to be verified.
     */
    verify(message: IVerifiable): boolean;
}
