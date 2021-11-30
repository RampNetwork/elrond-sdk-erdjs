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
exports.ContractWrapper = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const __1 = require("..");
const chainSendContext_1 = require("./chainSendContext");
const generateMethods_1 = require("./generateMethods");
const formattedCall_1 = require("./formattedCall");
const argumentErrorContext_1 = require("../argumentErrorContext");
const __2 = require("../..");
const preparedCall_1 = require("./preparedCall");
const _1 = require(".");
const testutils_1 = require("../../testutils");
/**
 * Provides a simple interface in order to easily call or query the smart contract's methods.
 */
class ContractWrapper extends chainSendContext_1.ChainSendContext {
    constructor(smartContract, abi, wasmPath, context, builtinFunctions) {
        super(context);
        this.context = context;
        this.smartContract = smartContract;
        this.abi = abi;
        this.wasmPath = wasmPath;
        this.builtinFunctions = builtinFunctions || this;
        this.call = generateMethods_1.generateMethods(this, this.abi, this.handleCall);
        this.results = generateMethods_1.generateMethods(this, this.abi, this.handleResults);
        this.query = generateMethods_1.generateMethods(this, this.abi, this.handleQuery);
        this.format = generateMethods_1.generateMethods(this, this.abi, this.handleFormat);
        let constructor = this.abi.getConstructorDefinition();
        if (constructor !== null) {
            this.call.deploy = this.handleDeployCall.bind(this, constructor);
            this.format.deploy = this.handleFormat.bind(this, constructor);
        }
    }
    address(address) {
        let typedAddress = __1.NativeSerializer.convertNativeToAddress(address, new argumentErrorContext_1.ArgumentErrorContext("address", "0", new __1.EndpointParameterDefinition("address", "", new __1.AddressType())));
        this.smartContract.setAddress(typedAddress);
        return this;
    }
    getAddress() {
        return this.smartContract.getAddress();
    }
    getAbi() {
        return this.abi;
    }
    getSmartContract() {
        return this.smartContract;
    }
    getCode() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wasmPath == null) {
                throw new __2.Err("contract wasm path not configured");
            }
            return yield testutils_1.loadContractCode(this.wasmPath);
        });
    }
    buildDeployTransaction(constructorDefinition, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractCode = yield this.getCode();
            let convertedArgs = formattedCall_1.formatEndpoint(constructorDefinition, constructorDefinition, ...args).toTypedValues();
            let transaction = this.smartContract.deploy({
                code: contractCode,
                gasLimit: this.context.getGasLimit(),
                initArguments: convertedArgs
            });
            return transaction;
        });
    }
    handleDeployCall(constructorDefinition, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield this.buildDeployTransaction(constructorDefinition, args);
            let transactionOnNetwork = yield this.processTransaction(transaction);
            let smartContractResults = transactionOnNetwork.getSmartContractResults();
            let immediateResult = smartContractResults.getImmediate();
            immediateResult.assertSuccess();
            let logger = this.context.getLogger();
            logger === null || logger === void 0 ? void 0 : logger.deployComplete(transaction, smartContractResults, this.smartContract.getAddress());
        });
    }
    static loadProject(provider, builtinFunctions, projectPath, filenameHint, sendContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let { abiPath, wasmPath } = yield expandProjectPath(projectPath, filenameHint);
            let abi = yield __1.SmartContractAbi.fromAbiPath(abiPath);
            let smartContract = new __1.SmartContract({ abi: abi });
            sendContext = sendContext || new _1.SendContext(provider).logger(new _1.ContractLogger());
            return new ContractWrapper(smartContract, abi, wasmPath, sendContext, builtinFunctions);
        });
    }
    handleQuery(endpoint, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let preparedCall = yield this.prepareCallWithPayment(endpoint, args);
            let interaction = this.convertPreparedCallToInteraction(preparedCall);
            let provider = this.context.getProvider();
            let logger = this.context.getLogger();
            let query = interaction.buildQuery();
            logger === null || logger === void 0 ? void 0 : logger.queryCreated(query);
            let optionalSender = this.context.getSenderOptional();
            if (optionalSender != null) {
                query.caller = optionalSender.address;
            }
            let response = yield provider.queryContract(query);
            let queryResponseBundle = interaction.interpretQueryResponse(response);
            let result = queryResponseBundle.queryResponse.unpackOutput();
            logger === null || logger === void 0 ? void 0 : logger.queryComplete(result, response);
            return result;
        });
    }
    handleCall(endpoint, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let { transaction, interaction } = this.buildTransactionAndInteraction(endpoint, args);
            let { result } = yield this.processTransactionAndInterpretResults({ transaction, interaction });
            return result;
        });
    }
    handleResults(endpoint, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let { transaction, interaction } = this.buildTransactionAndInteraction(endpoint, args);
            let { executionResultsBundle } = yield this.processTransactionAndInterpretResults({ transaction, interaction });
            return executionResultsBundle;
        });
    }
    processTransactionAndInterpretResults({ transaction, interaction }) {
        return __awaiter(this, void 0, void 0, function* () {
            let transactionOnNetwork = yield this.processTransaction(transaction);
            let executionResultsBundle = interaction.interpretExecutionResults(transactionOnNetwork);
            let { smartContractResults, immediateResult } = executionResultsBundle;
            let result = immediateResult === null || immediateResult === void 0 ? void 0 : immediateResult.unpackOutput();
            let logger = this.context.getLogger();
            logger === null || logger === void 0 ? void 0 : logger.transactionComplete(result, immediateResult === null || immediateResult === void 0 ? void 0 : immediateResult.data, transaction, smartContractResults);
            return { executionResultsBundle, result };
        });
    }
    processTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let provider = this.context.getProvider();
            let sender = this.context.getSender();
            transaction.setNonce(sender.account.nonce);
            yield sender.signer.sign(transaction);
            let logger = this.context.getLogger();
            logger === null || logger === void 0 ? void 0 : logger.transactionCreated(transaction);
            yield transaction.send(provider);
            // increment the nonce only after the transaction is sent
            // since an exception thrown by the provider means we will have to re-use the same nonce
            // otherwise the next transactions will hang (and never complete)
            sender.account.incrementNonce();
            logger === null || logger === void 0 ? void 0 : logger.transactionSent(transaction);
            yield transaction.awaitExecuted(provider);
            let transactionOnNetwork = yield transaction.getAsOnNetwork(provider, true, false, true);
            if (transaction.getStatus().isFailed()) {
                // TODO: extract the error messages
                //let results = transactionOnNetwork.getSmartContractResults().getAllResults();
                //let messages = results.map((result) => console.log(result));
                throw new __2.ErrContract(`Transaction status failed: [${transaction.getStatus().toString()}].`); // Return messages:\n${messages}`);
            }
            return transactionOnNetwork;
        });
    }
    handleFormat(endpoint, ...args) {
        let { formattedCall } = this.prepareCallWithPayment(endpoint, args);
        return formattedCall;
    }
    buildTransactionAndInteraction(endpoint, args) {
        let preparedCall = this.prepareCallWithPayment(endpoint, args);
        let interaction = this.convertPreparedCallToInteraction(preparedCall);
        interaction.withGasLimit(this.context.getGasLimit());
        let transaction = interaction.buildTransaction();
        return { transaction, interaction };
    }
    prepareCallWithPayment(endpoint, args) {
        let value = this.context.getAndResetValue();
        if (value == null && endpoint.modifiers.isPayable()) {
            throw new __2.Err("Did not provide any value for a payable method");
        }
        if (value != null && !endpoint.modifiers.isPayable()) {
            throw new __2.Err("A value was provided for a non-payable method");
        }
        if (value != null && !endpoint.modifiers.isPayableInToken(value.token.getTokenIdentifier())) {
            throw new __2.Err(`Token ${value.token.getTokenIdentifier()} is not accepted by payable method. Accepted tokens: ${endpoint.modifiers.payableInTokens}`);
        }
        let formattedCall = formattedCall_1.formatEndpoint(endpoint, endpoint, ...args);
        let preparedCall = new preparedCall_1.PreparedCall(this.smartContract.getAddress(), __2.Egld(0), formattedCall);
        this.applyValueModfiers(value, preparedCall);
        return preparedCall;
    }
    convertPreparedCallToInteraction(preparedCall) {
        let executingFunction = preparedCall.formattedCall.getExecutingFunction();
        let interpretingFunction = preparedCall.formattedCall.getInterpretingFunction();
        let typedValueArgs = preparedCall.formattedCall.toTypedValues();
        let interaction = new __1.Interaction(this.smartContract, executingFunction, interpretingFunction, typedValueArgs, preparedCall.receiver);
        interaction.withValue(preparedCall.egldValue);
        return interaction;
    }
    applyValueModfiers(value, preparedCall) {
        if (value == null) {
            return;
        }
        if (value.token.isEgld()) {
            preparedCall.egldValue = value;
            return;
        }
        if (value.token.isFungible()) {
            preparedCall.wrap(this.builtinFunctions.format.ESDTTransfer(value.token.getTokenIdentifier(), value.valueOf(), preparedCall.formattedCall));
        }
        else {
            preparedCall.receiver = this.context.getSender().address;
            preparedCall.wrap(this.builtinFunctions.format.ESDTNFTTransfer(value.token.getTokenIdentifier(), value.getNonce(), value.valueOf(), this.smartContract, preparedCall.formattedCall));
        }
    }
}
exports.ContractWrapper = ContractWrapper;
function filterByExtension(fileList, extension) {
    return fileList.filter(name => name.endsWith(extension));
}
function filterByFilename(fileList, filename) {
    return fileList.filter(name => name == filename);
}
// Compiling creates a temporary file which sometimes doesn't get deleted. It should be ignored.
function ignoreTemporaryWasmFiles(fileList) {
    let temporaryWasmFiles = filterByExtension(fileList, "_wasm.wasm");
    let difference = fileList.filter(file => temporaryWasmFiles.indexOf(file) === -1);
    return difference;
}
function filterWithHint(fileList, extension, filenameHint) {
    if (filenameHint) {
        let pattern = filenameHint + extension;
        return {
            pattern,
            filteredFileList: filterByFilename(fileList, pattern)
        };
    }
    return {
        pattern: "*" + extension,
        filteredFileList: filterByExtension(fileList, extension)
    };
}
function getFileByExtension(fileList, folderPath, extension, filenameHint) {
    let { pattern, filteredFileList } = filterWithHint(fileList, extension, filenameHint);
    if (filteredFileList.length != 1) {
        throw new __2.ErrInvalidArgument(`Expected a single ${pattern} file in ${folderPath} (found ${filteredFileList.length})`);
    }
    return path_1.default.join(folderPath, filteredFileList[0]);
}
function getAbiAndWasmPaths(outputPath, filenameHint) {
    return __awaiter(this, void 0, void 0, function* () {
        let filesInOutput = yield fs_1.default.promises.readdir(outputPath);
        filesInOutput = ignoreTemporaryWasmFiles(filesInOutput);
        let abiPath = getFileByExtension(filesInOutput, outputPath, ".abi.json", filenameHint);
        let wasmPath;
        try {
            wasmPath = getFileByExtension(filesInOutput, outputPath, ".wasm", filenameHint);
        }
        catch (_) {
            wasmPath = null;
        }
        return { abiPath, wasmPath };
    });
}
function expandProjectPath(projectPath, filenameHint) {
    return __awaiter(this, void 0, void 0, function* () {
        projectPath = path_1.default.resolve(projectPath);
        try {
            return yield getAbiAndWasmPaths(projectPath, filenameHint);
        }
        catch (_) {
            let outputPath = path_1.default.join(projectPath, "output");
            return yield getAbiAndWasmPaths(outputPath, filenameHint);
        }
    });
}
//# sourceMappingURL=contractWrapper.js.map