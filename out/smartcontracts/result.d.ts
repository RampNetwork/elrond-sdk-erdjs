/// <reference types="node" />
import { EndpointDefinition, ReturnCode, TypedValue } from "..";
export declare namespace Result {
    interface IResult {
        setEndpointDefinition(endpointDefinition: EndpointDefinition): void;
        getEndpointDefinition(): EndpointDefinition | undefined;
        getReturnCode(): ReturnCode;
        getReturnMessage(): string;
        isSuccess(): boolean;
        assertSuccess(): void;
        outputUntyped(): Buffer[];
        outputTyped(): TypedValue[];
        unpackOutput(): any;
    }
    function isSuccess(result: IResult): boolean;
    function assertSuccess(result: IResult): void;
    function outputTyped(result: IResult): TypedValue[];
    function unpackOutput(result: IResult): any;
}
