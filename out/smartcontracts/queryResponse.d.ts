/// <reference types="node" />
import { GasLimit } from "../networkParams";
import { EndpointDefinition, TypedValue } from "./typesystem";
import { ReturnCode } from "./returnCode";
import { Result } from "./result";
export declare class QueryResponse implements Result.IResult {
    /**
     * If available, will provide typed output arguments (with typed values).
     */
    private endpointDefinition?;
    returnData: string[];
    returnCode: ReturnCode;
    returnMessage: string;
    gasUsed: GasLimit;
    constructor(init?: Partial<QueryResponse>);
    /**
     * Constructs a QueryResponse object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload: any): QueryResponse;
    getEndpointDefinition(): EndpointDefinition | undefined;
    getReturnCode(): ReturnCode;
    getReturnMessage(): string;
    unpackOutput(): any;
    assertSuccess(): void;
    isSuccess(): boolean;
    setEndpointDefinition(endpointDefinition: EndpointDefinition): void;
    outputUntyped(): Buffer[];
    outputTyped(): TypedValue[];
    /**
     * Converts the object to a pretty, plain JavaScript object.
     */
    toJSON(): object;
}
