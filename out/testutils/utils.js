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
exports.setupUnitTestWatcherTimeouts = exports.extendAbiRegistry = exports.loadAbiRegistry = exports.loadContractCode = void 0;
const code_1 = require("../smartcontracts/code");
const typesystem_1 = require("../smartcontracts/typesystem");
const transactionWatcher_1 = require("../transactionWatcher");
function loadContractCode(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isBrowser()) {
            return code_1.Code.fromUrl(path.toString());
        }
        return code_1.Code.fromFile(path);
    });
}
exports.loadContractCode = loadContractCode;
function loadAbiRegistry(paths) {
    return __awaiter(this, void 0, void 0, function* () {
        let sources = paths.map(e => e.toString());
        if (isBrowser()) {
            return typesystem_1.AbiRegistry.load({ urls: sources });
        }
        return typesystem_1.AbiRegistry.load({ files: sources });
    });
}
exports.loadAbiRegistry = loadAbiRegistry;
function extendAbiRegistry(registry, path) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = path.toString();
        if (isBrowser()) {
            return registry.extendFromUrl(source);
        }
        return registry.extendFromFile(source);
    });
}
exports.extendAbiRegistry = extendAbiRegistry;
function isBrowser() {
    return typeof window !== "undefined";
}
function setupUnitTestWatcherTimeouts() {
    transactionWatcher_1.TransactionWatcher.DefaultPollingInterval = 42;
    transactionWatcher_1.TransactionWatcher.DefaultTimeout = 42 * 42;
}
exports.setupUnitTestWatcherTimeouts = setupUnitTestWatcherTimeouts;
//# sourceMappingURL=utils.js.map