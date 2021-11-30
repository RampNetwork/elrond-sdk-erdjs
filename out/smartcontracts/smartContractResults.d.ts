/// <reference types="node" />
import { Address } from "../address";
import { Balance } from "../balance";
import { Hash } from "../hash";
import { GasLimit, GasPrice } from "../networkParams";
import { Nonce } from "../nonce";
import { EndpointDefinition, TypedValue } from "./typesystem";
import { ReturnCode } from "./returnCode";
import { Result } from "./result";
export declare class SmartContractResults {
    private readonly items;
    private readonly immediate;
    private readonly resultingCalls;
    constructor(items: SmartContractResultItem[]);
    static empty(): SmartContractResults;
    static fromHttpResponse(smartContractResults: any[]): SmartContractResults;
    private findImmediateResult;
    private findResultingCalls;
    getImmediate(): TypedResult;
    getResultingCalls(): TypedResult[];
    getAllResults(): TypedResult[];
}
export declare class SmartContractResultItem {
    hash: Hash;
    nonce: Nonce;
    value: Balance;
    receiver: Address;
    sender: Address;
    data: string;
    previousHash: Hash;
    originalHash: Hash;
    gasLimit: GasLimit;
    gasPrice: GasPrice;
    callType: number;
    returnMessage: string;
    static fromHttpResponse(response: {
        hash: string;
        nonce: number;
        value: string;
        receiver: string;
        sender: string;
        data: string;
        prevTxHash: string;
        originalTxHash: string;
        gasLimit: number;
        gasPrice: number;
        callType: number;
        returnMessage: string;
    }): SmartContractResultItem;
    getDataTokens(): Buffer[];
}
export declare class TypedResult extends SmartContractResultItem implements Result.IResult {
    /**
    * If available, will provide typed output arguments (with typed values).
    */
    endpointDefinition?: EndpointDefinition;
    constructor(init?: Partial<SmartContractResultItem>);
    assertSuccess(): void;
    isSuccess(): boolean;
    getReturnCode(): ReturnCode;
    outputUntyped(): Buffer[];
    setEndpointDefinition(endpointDefinition: EndpointDefinition): void;
    getEndpointDefinition(): EndpointDefinition | undefined;
    getReturnMessage(): string;
    outputTyped(): TypedValue[];
    unpackOutput(): any;
}
