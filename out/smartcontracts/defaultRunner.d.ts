import { IProvider, ISigner } from "../interface";
import { ExecutionResultsBundle, IInteractionChecker, IInteractionRunner, QueryResponseBundle } from "./interface";
import { Interaction } from "./interaction";
import { Transaction } from "../transaction";
import { Address } from "../address";
/**
 * An interaction runner suitable for backends or wallets.
 * Not suitable for dapps, which depend on external signers (wallets, ledger etc.).
 */
export declare class DefaultInteractionRunner implements IInteractionRunner {
    private readonly checker;
    private readonly signer;
    private readonly provider;
    constructor(checker: IInteractionChecker, signer: ISigner, provider: IProvider);
    /**
     * Given an interaction, broadcasts its compiled transaction.
     */
    run(interaction: Interaction): Promise<Transaction>;
    /**
     * Given an interaction, broadcasts its compiled transaction (and also waits for its execution on the Network).
     */
    runAwaitExecution(interaction: Interaction): Promise<ExecutionResultsBundle>;
    runQuery(interaction: Interaction, caller?: Address): Promise<QueryResponseBundle>;
    runSimulation(interaction: Interaction): Promise<any>;
    private checkInteraction;
}
