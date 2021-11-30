import { UserSecretKey } from "./userKeys";
import { EncryptedData, Randomness } from "../crypto";
export declare class UserWallet {
    private readonly publicKey;
    private readonly encryptedData;
    /**
     * Copied from: https://github.com/ElrondNetwork/elrond-core-js/blob/v1.28.0/src/account.js#L76
     * Notes: adjustements (code refactoring, no change in logic), in terms of:
     *  - typing (since this is the TypeScript version)
     *  - error handling (in line with erdjs's error system)
     *  - references to crypto functions
     *  - references to object members
     *
     * Given a password, generates the contents for a file containing the account's secret key,
     * passed through a password-based key derivation function (kdf).
     */
    constructor(secretKey: UserSecretKey, password: string, randomness?: Randomness);
    /**
     * Copied from: https://github.com/ElrondNetwork/elrond-core-js/blob/v1.28.0/src/account.js#L42
     * Notes: adjustements (code refactoring, no change in logic), in terms of:
     *  - typing (since this is the TypeScript version)
     *  - error handling (in line with erdjs's error system)
     *  - references to crypto functions
     *  - references to object members
     *
     * From an encrypted keyfile, given the password, loads the secret key and the public key.
     */
    static decryptSecretKey(keyFileObject: any, password: string): UserSecretKey;
    static edFromJSON(keyfileObject: any): EncryptedData;
    /**
     * Converts the encrypted keyfile to plain JavaScript object.
     */
    toJSON(): any;
}
