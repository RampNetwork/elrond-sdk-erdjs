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
exports.getGasFromValue = exports.SystemWrapper = exports.SystemConstants = void 0;
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const __2 = require("../..");
const testutils_1 = require("../../testutils");
const nativeSerializer_1 = require("../nativeSerializer");
const argumentErrorContext_1 = require("../argumentErrorContext");
const chainSendContext_1 = require("./chainSendContext");
var SystemConstants;
(function (SystemConstants) {
    SystemConstants.SYSTEM_ABI_PATH = path_1.default.join(__dirname, "../../../abi");
    SystemConstants.ESDT_CONTRACT_ADDRESS = new __2.Address("erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u");
    SystemConstants.MIN_TRANSACTION_GAS = 50000;
    SystemConstants.ESDT_ISSUE_GAS_LIMIT = 60000000;
    SystemConstants.ESDT_TRANSFER_GAS_LIMIT = 500000;
    SystemConstants.ESDT_NFT_TRANSFER_GAS_LIMIT = 1000000;
    SystemConstants.ESDT_BASE_GAS_LIMIT = 6000000;
})(SystemConstants = exports.SystemConstants || (exports.SystemConstants = {}));
class SystemWrapper extends chainSendContext_1.ChainSendContext {
    constructor(provider, context, sendContract, esdtSystemContract, issueCost, builtinFunctions) {
        super(context);
        this.provider = provider;
        this.sendWrapper = sendContract;
        this.esdtSystemContract = esdtSystemContract;
        this.issueCost = issueCost;
        this.builtinFunctions = builtinFunctions;
    }
    loadWrapper(projectPath, filenameHint, context) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __1.ContractWrapper.loadProject(this.provider, this.builtinFunctions, projectPath, filenameHint, context);
        });
    }
    static getEsdtContractConfig(esdtSystemContract) {
        return __awaiter(this, void 0, void 0, function* () {
            let [ownerAddress, baseIssuingCost, minTokenNameLength, maxTokenNameLength] = yield esdtSystemContract.query.getContractConfig();
            return { ownerAddress, baseIssuingCost: __2.Egld.raw(baseIssuingCost), minTokenNameLength, maxTokenNameLength };
        });
    }
    static load(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let context = new __1.SendContext(provider).logger(new __1.ContractLogger());
            let builtinFunctions = yield __1.ContractWrapper.loadProject(provider, null, SystemConstants.SYSTEM_ABI_PATH, "builtinFunctions", context);
            let sendWrapper = yield __1.ContractWrapper.loadProject(provider, builtinFunctions, SystemConstants.SYSTEM_ABI_PATH, "sendWrapper", context);
            let esdtSystemContract = yield __1.ContractWrapper.loadProject(provider, builtinFunctions, SystemConstants.SYSTEM_ABI_PATH, "esdtSystemContract", context);
            esdtSystemContract.address(SystemConstants.ESDT_CONTRACT_ADDRESS);
            let issueCost;
            if (provider instanceof testutils_1.MockProvider) {
                issueCost = __2.Balance.Zero();
            }
            else {
                let contractConfig = yield this.getEsdtContractConfig(esdtSystemContract);
                issueCost = contractConfig.baseIssuingCost;
            }
            return new SystemWrapper(provider, context, sendWrapper, esdtSystemContract, issueCost, builtinFunctions);
        });
    }
    send(receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            let address = nativeSerializer_1.NativeSerializer.convertNativeToAddress(receiver, new argumentErrorContext_1.ArgumentErrorContext("send", "0", new __1.EndpointParameterDefinition("receiver", "", new __1.AddressType())));
            yield this.sendWrapper.address(address).autoGas(0).call[""]();
        });
    }
    issueFungible(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let { resultingCalls: [issueResult] } = yield this.esdtSystemContract
                .gas(SystemConstants.ESDT_ISSUE_GAS_LIMIT)
                .value(this.issueCost)
                .results.issue(...args);
            let { tokenIdentifier } = __2.EsdtHelpers.extractFieldsFromEsdtTransferDataField(issueResult.data);
            tokenIdentifier = Buffer.from(tokenIdentifier, "hex").toString();
            return this.recallToken(tokenIdentifier);
        });
    }
    issueSemiFungible(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenIdentifier = (yield this.esdtSystemContract
                .gas(SystemConstants.ESDT_ISSUE_GAS_LIMIT)
                .value(this.issueCost)
                .call.issueSemiFungible(...args)).toString();
            return this.recallToken(tokenIdentifier);
        });
    }
    issueNonFungible(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenIdentifier = (yield this.esdtSystemContract
                .gas(SystemConstants.ESDT_ISSUE_GAS_LIMIT)
                .value(this.issueCost)
                .call.issueNonFungible(...args)).toString();
            return this.recallToken(tokenIdentifier);
        });
    }
    esdtNftCreate(balanceBuilder, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let nonce = yield this.builtinFunctions
                .address(this.context.getSender())
                .gas(SystemConstants.ESDT_BASE_GAS_LIMIT)
                .call
                .ESDTNFTCreate(balanceBuilder, ...args);
            return balanceBuilder.nonce(nonce);
        });
    }
    recallToken(tokenIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenProperties = yield this.esdtSystemContract.query.getTokenProperties(tokenIdentifier);
            let token = __2.Token.fromTokenProperties(tokenIdentifier, tokenProperties);
            return __2.createBalanceBuilder(token);
        });
    }
    getBalance(address, balanceBuilder) {
        return __awaiter(this, void 0, void 0, function* () {
            let typedAddress = nativeSerializer_1.NativeSerializer.convertNativeToAddress(address, new argumentErrorContext_1.ArgumentErrorContext("getBalance", "0", new __1.EndpointParameterDefinition("account", "", new __1.AddressType())));
            if (balanceBuilder.getToken().isEgld()) {
                return yield this.provider.getAccount(typedAddress).then((account) => account.balance);
            }
            let tokenData = yield this.getTokenData(typedAddress, balanceBuilder);
            return balanceBuilder.raw(tokenData.balance);
        });
    }
    getBalanceList(address, balanceBuilder) {
        return __awaiter(this, void 0, void 0, function* () {
            let typedAddress = nativeSerializer_1.NativeSerializer.convertNativeToAddress(address, new argumentErrorContext_1.ArgumentErrorContext("getBalanceList", "0", new __1.EndpointParameterDefinition("account", "", new __1.AddressType())));
            if (balanceBuilder.getToken().isNft() && balanceBuilder.hasNonce()) {
                return [yield this.getBalance(typedAddress, balanceBuilder)];
            }
            return yield this.provider.getAddressEsdtList(typedAddress).then((esdtList) => {
                let tokenBalances = [];
                let filterIdentifier = balanceBuilder.getTokenIdentifier() + '-';
                for (let [identifier, details] of Object.entries(esdtList)) {
                    if (identifier.startsWith(filterIdentifier)) {
                        tokenBalances.push(balanceBuilder.nonce(details.nonce).raw(details.balance));
                    }
                }
                return tokenBalances;
            });
        });
    }
    getTokenData(address, balanceBuilder) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenIdentifier = balanceBuilder.getTokenIdentifier();
            if (balanceBuilder.getToken().isFungible()) {
                return yield this.provider.getAddressEsdt(address, tokenIdentifier);
            }
            else {
                return yield this.provider.getAddressNft(address, tokenIdentifier, balanceBuilder.getNonce());
            }
        });
    }
    currentNonce() {
        return __awaiter(this, void 0, void 0, function* () {
            let networkStatus = yield this.provider.getNetworkStatus();
            return networkStatus.Nonce;
        });
    }
}
exports.SystemWrapper = SystemWrapper;
function getGasFromValue(baseGas, value) {
    if (!value || value.isEgld()) {
        return Math.max(baseGas, SystemConstants.MIN_TRANSACTION_GAS);
    }
    if (value.token.isFungible()) {
        return baseGas + SystemConstants.ESDT_TRANSFER_GAS_LIMIT;
    }
    else {
        return baseGas + SystemConstants.ESDT_NFT_TRANSFER_GAS_LIMIT;
    }
}
exports.getGasFromValue = getGasFromValue;
//# sourceMappingURL=systemWrapper.js.map