import { Address, Balance } from "../..";
import { FormattedCall } from "./formattedCall";
/**
 * Keeps track of part of the context necessary for making a call to a smart contract method.
 */
export declare class PreparedCall {
    receiver: Address;
    egldValue: Balance;
    formattedCall: FormattedCall;
    constructor(receiver: Address, egldValue: Balance, formattedCall: FormattedCall);
    wrap(wrappedCall: FormattedCall): void;
}
