"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultInteractionRunner = void 0;
/**
 * An interaction runner suitable for backends or wallets.
 * Not suitable for dapps, which depend on external signers (wallets, ledger etc.).
 */
class DefaultInteractionRunner {
    constructor(checker, signer, provider) {
        this.checker = checker;
        this.signer = signer;
        this.provider = provider;
    }
    /**
     * Given an interaction, broadcasts its compiled transaction.
     */
    run(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkInteraction(interaction);
            let transaction = interaction.buildTransaction();
            yield this.signer.sign(transaction);
            yield transaction.send(this.provider);
            return transaction;
        });
    }
    /**
     * Given an interaction, broadcasts its compiled transaction (and also waits for its execution on the Network).
     */
    runAwaitExecution(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkInteraction(interaction);
            let transaction = yield this.run(interaction);
            yield transaction.awaitExecuted(this.provider);
            // This will wait until the transaction is notarized, as well (so that SCRs are returned by the API).
            let transactionOnNetwork = yield transaction.getAsOnNetwork(this.provider);
            let bundle = interaction.interpretExecutionResults(transactionOnNetwork);
            return bundle;
        });
    }
    runQuery(interaction, caller) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkInteraction(interaction);
            let query = interaction.buildQuery();
            query.caller = caller || this.signer.getAddress();
            let response = yield this.provider.queryContract(query);
            let bundle = interaction.interpretQueryResponse(response);
            return bundle;
        });
    }
    runSimulation(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkInteraction(interaction);
            let transaction = interaction.buildTransaction();
            yield this.signer.sign(transaction);
            return yield transaction.simulate(this.provider);
        });
    }
    checkInteraction(interaction) {
        this.checker.checkInteraction(interaction);
    }
}
exports.DefaultInteractionRunner = DefaultInteractionRunner;
//# sourceMappingURL=defaultRunner.js.map