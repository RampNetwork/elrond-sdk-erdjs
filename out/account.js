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
exports.AccountOnNetwork = exports.Account = void 0;
const address_1 = require("./address");
const nonce_1 = require("./nonce");
const balance_1 = require("./balance");
const balanceBuilder_1 = require("./balanceBuilder");
/**
 * An abstraction representing an account (user or Smart Contract) on the Network.
 */
class Account {
    /**
     * Creates an account object from an address
     */
    constructor(address) {
        /**
         * The address of the account.
         */
        this.address = new address_1.Address();
        /**
         * The nonce of the account (the account sequence number).
         */
        this.nonce = new nonce_1.Nonce(0);
        /**
         * The balance of the account.
         */
        this.balance = balanceBuilder_1.Egld("0");
        this.asOnNetwork = new AccountOnNetwork();
        this.address = address;
    }
    /**
     * Queries the details of the account on the Network
     * @param provider the Network provider
     * @param cacheLocally whether to save the query response within the object, locally
     */
    getAsOnNetwork(provider, cacheLocally = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.address.assertNotEmpty();
            let response = yield provider.getAccount(this.address);
            if (cacheLocally) {
                this.asOnNetwork = response;
            }
            return response;
        });
    }
    /**
     * Gets a previously saved query response
     */
    getAsOnNetworkCached() {
        return this.asOnNetwork;
    }
    /**
     * Synchronizes account properties (such as nonce, balance) with the ones queried from the Network
     * @param provider the Network provider
     */
    sync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAsOnNetwork(provider, true);
            this.nonce = this.asOnNetwork.nonce;
            this.balance = this.asOnNetwork.balance;
        });
    }
    /**
     * Increments (locally) the nonce (the account sequence number).
     */
    incrementNonce() {
        this.nonce = this.nonce.increment();
    }
    /**
     * Gets then increments (locally) the nonce (the account sequence number).
     */
    getNonceThenIncrement() {
        let nonce = this.nonce;
        this.nonce = this.nonce.increment();
        return nonce;
    }
    /**
     * Converts the account to a pretty, plain JavaScript object.
     */
    toJSON() {
        return {
            address: this.address.bech32(),
            nonce: this.nonce.valueOf(),
            balance: this.balance.toString(),
        };
    }
}
exports.Account = Account;
/**
 * A plain view of an account, as queried from the Network.
 */
class AccountOnNetwork {
    constructor(init) {
        this.address = new address_1.Address();
        this.nonce = new nonce_1.Nonce(0);
        this.balance = balanceBuilder_1.Egld(0);
        this.code = "";
        this.userName = "";
        Object.assign(this, init);
    }
    static fromHttpResponse(payload) {
        let result = new AccountOnNetwork();
        result.address = new address_1.Address(payload["address"] || 0);
        result.nonce = new nonce_1.Nonce(payload["nonce"] || 0);
        result.balance = balance_1.Balance.fromString(payload["balance"]);
        result.code = payload["code"];
        result.userName = payload["username"];
        return result;
    }
}
exports.AccountOnNetwork = AccountOnNetwork;
//# sourceMappingURL=account.js.map