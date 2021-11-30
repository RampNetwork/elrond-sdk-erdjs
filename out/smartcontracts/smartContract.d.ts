import { Address } from "../address";
import { Transaction } from "../transaction";
import { Code } from "./code";
import { CodeMetadata } from "./codeMetadata";
import { CallArguments, DeployArguments, ISmartContract as ISmartContract, QueryArguments, UpgradeArguments } from "./interface";
import { Nonce } from "../nonce";
import { QueryResponse } from "./queryResponse";
import { IProvider } from "../interface";
import { SmartContractAbi } from "./abi";
/**
 * An abstraction for deploying and interacting with Smart Contracts.
 */
export declare class SmartContract implements ISmartContract {
    private owner;
    private address;
    private code;
    private codeMetadata;
    private abi?;
    private readonly trackOfTransactions;
    /**
     * This object contains a function for each endpoint defined by the contract.
     * (a bit similar to web3js's "contract.methods").
     */
    readonly methods: any;
    /**
     * Create a SmartContract object by providing its address on the Network.
     */
    constructor({ address, abi }: {
        address?: Address;
        abi?: SmartContractAbi;
    });
    private setupMethods;
    /**
     * Sets the address, as on Network.
     */
    setAddress(address: Address): void;
    /**
     * Gets the address, as on Network.
     */
    getAddress(): Address;
    /**
     * Gets the owner address.
     *
     * Note that this function doesn't query the Network, but uses the information acquired when signing a deployment transaction.
     * Therefore, currently, this function is useful only in the context of deploying Smart Contracts.
     */
    getOwner(): Address;
    /**
     * Gets the {@link Code} of the Smart Contract. Does not query the Network.
     */
    getCode(): Code;
    /**
     * Gets the {@link CodeMetadata} of the Smart Contract. Does not query the Network.
     */
    getCodeMetadata(): CodeMetadata;
    setAbi(abi: SmartContractAbi): void;
    getAbi(): SmartContractAbi;
    /**
     * Creates a {@link Transaction} for deploying the Smart Contract to the Network.
     */
    deploy({ code, codeMetadata, initArguments, value, gasLimit }: DeployArguments): Transaction;
    private onDeploySigned;
    /**
     * Creates a {@link Transaction} for upgrading the Smart Contract on the Network.
     */
    upgrade({ code, codeMetadata, initArguments, value, gasLimit }: UpgradeArguments): Transaction;
    private onUpgradeSigned;
    /**
     * Creates a {@link Transaction} for calling (a function of) the Smart Contract.
     */
    call({ func, args, value, gasLimit, receiver }: CallArguments): Transaction;
    private onCallSigned;
    runQuery(provider: IProvider, { func, args, value, caller }: QueryArguments): Promise<QueryResponse>;
    /**
     * Computes the address of a Smart Contract.
     * The address is computed deterministically, from the address of the owner and the nonce of the deployment transaction.
     *
     * @param owner The owner of the Smart Contract
     * @param nonce The owner nonce used for the deployment transaction
     */
    static computeAddress(owner: Address, nonce: Nonce): Address;
}
