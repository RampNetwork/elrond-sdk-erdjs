import { Interaction } from "./interaction";
import { IInteractionChecker } from "./interface";
/**
 * An interaction checker that aims to be as strict as possible.
 * It is designed to catch programmer errors such as:
 *  - incorrect types of contract call arguments
 *  - errors related to calling "non-payable" functions with some value provided
 *  - gas estimation errors (not yet implemented)
 */
export declare class StrictChecker implements IInteractionChecker {
    checkInteraction(interaction: Interaction): void;
    private checkPayable;
    private checkArguments;
}
