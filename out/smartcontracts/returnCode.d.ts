/// <reference types="node" />
export declare class ReturnCode {
    static None: ReturnCode;
    static Ok: ReturnCode;
    static FunctionNotFound: ReturnCode;
    static FunctionWrongSignature: ReturnCode;
    static ContractNotFound: ReturnCode;
    static UserError: ReturnCode;
    static OutOfGas: ReturnCode;
    static AccountCollision: ReturnCode;
    static OutOfFunds: ReturnCode;
    static CallStackOverFlow: ReturnCode;
    static ContractInvalid: ReturnCode;
    static ExecutionFailed: ReturnCode;
    static Unknown: ReturnCode;
    private readonly text;
    constructor(text: string);
    static fromBuffer(buffer: Buffer): ReturnCode;
    toString(): string;
    valueOf(): string;
    equals(other: ReturnCode): boolean;
    isSuccess(): boolean;
}
