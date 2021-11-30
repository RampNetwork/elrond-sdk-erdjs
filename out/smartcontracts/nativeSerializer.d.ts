/// <reference types="node" />
import { Code, EndpointDefinition, TypedValue } from ".";
import { Address, BalanceBuilder } from "..";
import { TestWallet } from "../testutils";
import { ArgumentErrorContext } from "./argumentErrorContext";
import { SmartContract } from "./smartContract";
import { ContractWrapper } from "./wrapper/contractWrapper";
export declare namespace NativeTypes {
    type NativeBuffer = Buffer | string | BalanceBuilder;
    type NativeBytes = Code | Buffer | string | BalanceBuilder;
    type NativeAddress = Address | string | Buffer | ContractWrapper | SmartContract | TestWallet;
}
export declare namespace NativeSerializer {
    /**
     * Interprets a set of native javascript values into a set of typed values, given parameter definitions.
     */
    function nativeToTypedValues(args: any[], endpoint: EndpointDefinition): TypedValue[];
    function convertNativeToAddress(native: NativeTypes.NativeAddress, errorContext: ArgumentErrorContext): Address;
}
