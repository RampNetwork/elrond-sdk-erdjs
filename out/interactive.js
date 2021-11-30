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
exports.chooseProvider = exports.getProviders = exports.setupInteractiveWithProvider = exports.setupInteractive = void 0;
const _1 = require(".");
const testutils_1 = require("./testutils");
function setupInteractive(providerChoice) {
    return __awaiter(this, void 0, void 0, function* () {
        let provider = chooseProvider(providerChoice);
        return yield setupInteractiveWithProvider(provider);
    });
}
exports.setupInteractive = setupInteractive;
function setupInteractiveWithProvider(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        yield _1.NetworkConfig.getDefault().sync(provider);
        let wallets = yield testutils_1.loadAndSyncTestWallets(provider);
        let erdSys = yield _1.SystemWrapper.load(provider);
        return { erdSys, Egld: _1.Egld, wallets };
    });
}
exports.setupInteractiveWithProvider = setupInteractiveWithProvider;
function getProviders() {
    return {
        "local-testnet": new _1.ProxyProvider("http://localhost:7950", { timeout: 5000 }),
        "elrond-testnet": new _1.ProxyProvider("https://testnet-gateway.elrond.com", { timeout: 5000 }),
        "elrond-devnet": new _1.ProxyProvider("https://devnet-gateway.elrond.com", { timeout: 5000 }),
        "elrond-mainnet": new _1.ProxyProvider("https://gateway.elrond.com", { timeout: 20000 }),
    };
}
exports.getProviders = getProviders;
function chooseProvider(providerChoice) {
    let providers = getProviders();
    if (providerChoice in providers) {
        return providers[providerChoice];
    }
    throw new _1.ErrInvalidArgument(`providerChoice is not recognized (must be one of: ${Object.keys(providers)})`);
}
exports.chooseProvider = chooseProvider;
//# sourceMappingURL=interactive.js.map