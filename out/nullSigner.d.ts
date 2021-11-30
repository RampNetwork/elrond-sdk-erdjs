import { ISigner, ISignable } from "./interface";
import { Address } from "./address";
/**
 * Null-object pattern: a null Signer, which does nothing.
 *
 * Useful for contract interaction flows with query-only purposes.
 */
export declare class NullSigner implements ISigner {
    private readonly address;
    /**
     * Creates a NullSigner.
     */
    constructor(address: Address);
    getAddress(): Address;
    /**
     * Applies a mock signature.
     */
    sign(signable: ISignable): Promise<void>;
}
