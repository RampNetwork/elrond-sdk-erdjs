import { Type } from "./types";
export declare class EndpointDefinition {
    readonly name: string;
    readonly input: EndpointParameterDefinition[];
    readonly output: EndpointParameterDefinition[];
    readonly modifiers: EndpointModifiers;
    constructor(name: string, input: EndpointParameterDefinition[], output: EndpointParameterDefinition[], modifiers: EndpointModifiers);
    isConstructor(): boolean;
    static fromJSON(json: {
        name: string;
        storageModifier: string;
        payableInTokens: string[];
        inputs: any[];
        outputs: [];
    }): EndpointDefinition;
}
export declare class EndpointModifiers {
    readonly storageModifier: string;
    readonly payableInTokens: string[];
    constructor(storageModifier: string, payableInTokens: string[]);
    isPayableInEGLD(): boolean;
    isPayableInToken(token: string): boolean;
    isPayable(): boolean;
    isReadonly(): boolean;
}
export declare class EndpointParameterDefinition {
    readonly name: string;
    readonly description: string;
    readonly type: Type;
    constructor(name: string, description: string, type: Type);
    static fromJSON(json: {
        name?: string;
        description?: string;
        type: string;
    }): EndpointParameterDefinition;
}
