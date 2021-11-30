/**
 * A function of a Smart Contract, as an abstraction.
 */
export declare class ContractFunction {
    /**
     * The name of the function.
     */
    readonly name: string;
    /**
     * Creates a ContractFunction object, given its name.
     *
     * @param name the name of the function
     */
    constructor(name: string);
    /**
     * Null-object pattern: creates an empty ContractFunction object.
     */
    static none(): ContractFunction;
    /**
     * Returns the name of the function.
     */
    toString(): string;
    valueOf(): string;
    equals(other: ContractFunction | null): boolean;
}
