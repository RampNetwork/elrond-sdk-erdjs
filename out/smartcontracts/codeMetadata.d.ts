/// <reference types="node" />
/**
 * The metadata of a Smart Contract, as an abstraction.
 */
export declare class CodeMetadata {
    private upgradeable;
    private readable;
    private payable;
    /**
     * Creates a metadata object. By default, set the `upgradeable` attribute, and uset all others.
     *
     * @param upgradeable Whether the contract is upgradeable
     * @param readable Whether other contracts can read this contract's data (without calling one of its pure functions)
     * @param payable Whether the contract is payable
     */
    constructor(upgradeable?: boolean, readable?: boolean, payable?: boolean);
    /**
     * Adjust the metadata (the `upgradeable` attribute), when preparing the deployment transaction.
     */
    toggleUpgradeable(value: boolean): void;
    /**
     * Adjust the metadata (the `readable` attribute), when preparing the deployment transaction.
     */
    toggleReadable(value: boolean): void;
    /**
     * Adjust the metadata (the `payable` attribute), when preparing the deployment transaction.
     */
    togglePayable(value: boolean): void;
    /**
     * Converts the metadata to the protocol-friendly representation.
     */
    toBuffer(): Buffer;
    /**
     * Converts the metadata to a hex-encoded string.
     */
    toString(): string;
    /**
     * Converts the metadata to a pretty, plain JavaScript object.
     */
    toJSON(): object;
}
