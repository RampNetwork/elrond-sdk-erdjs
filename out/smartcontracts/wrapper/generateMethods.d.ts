import { SmartContractAbi } from "../abi";
import { EndpointDefinition } from "../typesystem";
export declare type EndpointHandler<ThisType, ReturnType> = (this: ThisType, endpoint: EndpointDefinition, ...args: any[]) => ReturnType;
export declare type Method<ReturnType> = (...args: any[]) => ReturnType;
export declare type Methods<ReturnType> = Record<string, Method<ReturnType>>;
export declare function generateMethods<ThisType, ReturnType>(this_: ThisType, abi: SmartContractAbi, endpointHandler: EndpointHandler<ThisType, ReturnType>): Methods<ReturnType>;
