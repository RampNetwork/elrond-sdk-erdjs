/// <reference types="node" />
/**
 * Validator signer (BLS signer)
 */
export declare class ValidatorSigner {
    /**
     * Signs a message.
     */
    signUsingPem(pemText: string, pemIndex: number | undefined, signable: Buffer): Promise<void>;
}
