import { ContractFunction } from "./function";
import { Balance } from "../balance";
import { Address } from "../address";
import { TypedValue } from "./typesystem";
import BigNumber from "bignumber.js";
export declare const MaxUint64: BigNumber;
export declare class Query {
    caller: Address;
    address: Address;
    func: ContractFunction;
    args: TypedValue[];
    value: Balance;
    constructor(init?: Partial<Query>);
    toHttpRequest(): any;
}
