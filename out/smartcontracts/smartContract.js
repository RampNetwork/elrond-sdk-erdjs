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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContract = void 0;
const balance_1 = require("../balance");
const address_1 = require("../address");
const transaction_1 = require("../transaction");
const transactionPayload_1 = require("../transactionPayload");
const code_1 = require("./code");
const codeMetadata_1 = require("./codeMetadata");
const transactionPayloadBuilders_1 = require("./transactionPayloadBuilders");
const function_1 = require("./function");
const query_1 = require("./query");
const utils_1 = require("../utils");
const utils_2 = require("./codec/utils");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const interaction_1 = require("./interaction");
const createKeccakHash = require("keccak");
/**
 * An abstraction for deploying and interacting with Smart Contracts.
 */
class SmartContract {
    /**
     * Create a SmartContract object by providing its address on the Network.
     */
    constructor({ address, abi }) {
        this.owner = new address_1.Address();
        this.address = new address_1.Address();
        this.code = code_1.Code.nothing();
        this.codeMetadata = new codeMetadata_1.CodeMetadata();
        this.trackOfTransactions = [];
        /**
         * This object contains a function for each endpoint defined by the contract.
         * (a bit similar to web3js's "contract.methods").
         */
        this.methods = {};
        this.address = address || new address_1.Address();
        this.abi = abi;
        this.methods = {};
        if (abi) {
            this.setupMethods();
        }
    }
    setupMethods() {
        let contract = this;
        let abi = this.getAbi();
        for (const definition of abi.getAllEndpoints()) {
            let functionName = definition.name;
            // For each endpoint defined by the ABI, we attach a function to the "methods" object,
            // a function that receives typed values as arguments
            // and returns a prepared contract interaction.
            this.methods[functionName] = function (args) {
                let func = new function_1.ContractFunction(functionName);
                let interaction = new interaction_1.Interaction(contract, func, func, args || []);
                return interaction;
            };
        }
    }
    /**
     * Sets the address, as on Network.
     */
    setAddress(address) {
        this.address = address;
    }
    /**
     * Gets the address, as on Network.
     */
    getAddress() {
        return this.address;
    }
    /**
     * Gets the owner address.
     *
     * Note that this function doesn't query the Network, but uses the information acquired when signing a deployment transaction.
     * Therefore, currently, this function is useful only in the context of deploying Smart Contracts.
     */
    getOwner() {
        this.owner.assertNotEmpty();
        return this.owner;
    }
    /**
     * Gets the {@link Code} of the Smart Contract. Does not query the Network.
     */
    getCode() {
        return this.code;
    }
    /**
     * Gets the {@link CodeMetadata} of the Smart Contract. Does not query the Network.
     */
    getCodeMetadata() {
        return this.codeMetadata;
    }
    setAbi(abi) {
        this.abi = abi;
    }
    getAbi() {
        utils_1.guardValueIsSet("abi", this.abi);
        return this.abi;
    }
    /**
     * Creates a {@link Transaction} for deploying the Smart Contract to the Network.
     */
    deploy({ code, codeMetadata, initArguments, value, gasLimit }) {
        codeMetadata = codeMetadata || new codeMetadata_1.CodeMetadata();
        initArguments = initArguments || [];
        value = value || balance_1.Balance.Zero();
        let payload = transactionPayload_1.TransactionPayload.contractDeploy()
            .setCode(code)
            .setCodeMetadata(codeMetadata)
            .setInitArgs(initArguments)
            .build();
        let transaction = new transaction_1.Transaction({
            receiver: address_1.Address.Zero(),
            value: value,
            gasLimit: gasLimit,
            data: payload
        });
        this.code = code;
        this.codeMetadata = codeMetadata;
        transaction.onSigned.on(this.onDeploySigned.bind(this));
        return transaction;
    }
    onDeploySigned({ transaction, signedBy }) {
        this.owner = signedBy;
        let nonce = transaction.getNonce();
        let address = SmartContract.computeAddress(this.owner, nonce);
        this.setAddress(address);
        this.trackOfTransactions.push(transaction);
    }
    /**
     * Creates a {@link Transaction} for upgrading the Smart Contract on the Network.
     */
    upgrade({ code, codeMetadata, initArguments, value, gasLimit }) {
        codeMetadata = codeMetadata || new codeMetadata_1.CodeMetadata();
        initArguments = initArguments || [];
        value = value || balance_1.Balance.Zero();
        let payload = transactionPayload_1.TransactionPayload.contractUpgrade()
            .setCode(code)
            .setCodeMetadata(codeMetadata)
            .setInitArgs(initArguments)
            .build();
        let transaction = new transaction_1.Transaction({
            receiver: this.getAddress(),
            value: value,
            gasLimit: gasLimit,
            data: payload
        });
        this.code = code;
        this.codeMetadata = codeMetadata;
        transaction.onSigned.on(this.onUpgradeSigned.bind(this));
        return transaction;
    }
    onUpgradeSigned({ transaction }) {
        this.trackOfTransactions.push(transaction);
    }
    /**
     * Creates a {@link Transaction} for calling (a function of) the Smart Contract.
     */
    call({ func, args, value, gasLimit, receiver }) {
        args = args || [];
        value = value || balance_1.Balance.Zero();
        let payload = transactionPayload_1.TransactionPayload.contractCall()
            .setFunction(func)
            .setArgs(args)
            .build();
        let transaction = new transaction_1.Transaction({
            receiver: receiver ? receiver : this.getAddress(),
            value: value,
            gasLimit: gasLimit,
            data: payload
        });
        transaction.onSigned.on(this.onCallSigned.bind(this));
        return transaction;
    }
    onCallSigned({ transaction }) {
        this.trackOfTransactions.push(transaction);
    }
    runQuery(provider, { func, args, value, caller }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = new query_1.Query({
                address: this.address,
                func: func,
                args: args,
                value: value,
                caller: caller
            });
            let response = yield provider.queryContract(query);
            return response;
        });
    }
    /**
     * Computes the address of a Smart Contract.
     * The address is computed deterministically, from the address of the owner and the nonce of the deployment transaction.
     *
     * @param owner The owner of the Smart Contract
     * @param nonce The owner nonce used for the deployment transaction
     */
    static computeAddress(owner, nonce) {
        let initialPadding = Buffer.alloc(8, 0);
        let ownerPubkey = owner.pubkey();
        let shardSelector = ownerPubkey.slice(30);
        let ownerNonceBytes = Buffer.alloc(8);
        const bigNonce = new bignumber_js_1.default(nonce.valueOf().toString(10));
        const bigNonceBuffer = utils_2.bigIntToBuffer(bigNonce);
        ownerNonceBytes.write(bigNonceBuffer.reverse().toString('hex'), 'hex');
        let bytesToHash = Buffer.concat([ownerPubkey, ownerNonceBytes]);
        let hash = createKeccakHash("keccak256").update(bytesToHash).digest();
        let vmTypeBytes = Buffer.from(transactionPayloadBuilders_1.ArwenVirtualMachine, "hex");
        let addressBytes = Buffer.concat([
            initialPadding,
            vmTypeBytes,
            hash.slice(10, 30),
            shardSelector
        ]);
        let address = new address_1.Address(addressBytes);
        return address;
    }
}
exports.SmartContract = SmartContract;
//# sourceMappingURL=smartContract.js.map