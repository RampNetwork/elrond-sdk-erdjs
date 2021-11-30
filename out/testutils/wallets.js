"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.TestWallet = exports.loadTestWallet = exports.loadPassword = exports.loadMnemonic = exports.loadTestWallets = exports.syncTestWallets = exports.loadAndSyncTestWallets = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const account_1 = require("../account");
const address_1 = require("../address");
const walletcore_1 = require("../walletcore");
const userSigner_1 = require("../walletcore/userSigner");
function loadAndSyncTestWallets(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        let wallets = yield loadTestWallets();
        yield syncTestWallets(wallets, provider);
        return wallets;
    });
}
exports.loadAndSyncTestWallets = loadAndSyncTestWallets;
function syncTestWallets(wallets, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(Object.values(wallets).map((wallet) => __awaiter(this, void 0, void 0, function* () { return wallet.sync(provider); })));
    });
}
exports.syncTestWallets = syncTestWallets;
function loadTestWallets() {
    return __awaiter(this, void 0, void 0, function* () {
        let walletNames = ["alice", "bob", "carol", "dan", "eve", "frank", "grace", "heidi", "ivan", "judy", "mallory", "mike"];
        let wallets = yield Promise.all(walletNames.map((name) => __awaiter(this, void 0, void 0, function* () { return yield loadTestWallet(name); })));
        let walletMap = {};
        for (let i in walletNames) {
            walletMap[walletNames[i]] = wallets[i];
        }
        return walletMap;
    });
}
exports.loadTestWallets = loadTestWallets;
function loadMnemonic() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield readTestWalletFileContents("mnemonic.txt");
    });
}
exports.loadMnemonic = loadMnemonic;
function loadPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield readTestWalletFileContents("password.txt");
    });
}
exports.loadPassword = loadPassword;
function loadTestWallet(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let jsonContents = JSON.parse(yield readTestWalletFileContents(name + ".json"));
        let pemContents = yield readTestWalletFileContents(name + ".pem");
        let pemKey = walletcore_1.UserSecretKey.fromPem(pemContents);
        return new TestWallet(new address_1.Address(jsonContents.address), pemKey.hex(), jsonContents, pemContents);
    });
}
exports.loadTestWallet = loadTestWallet;
function readTestWalletFileContents(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let basePath = path.join(__dirname, "testwallets");
        let filePath = path.join(basePath, name);
        return yield fs.promises.readFile(filePath, { encoding: "utf8" });
    });
}
class TestWallet {
    constructor(address, secretKeyHex, keyFileObject, pemFileText) {
        this.address = address;
        this.secretKeyHex = secretKeyHex;
        this.secretKey = Buffer.from(secretKeyHex, "hex");
        this.signer = new userSigner_1.UserSigner(walletcore_1.UserSecretKey.fromString(secretKeyHex));
        this.keyFileObject = keyFileObject;
        this.pemFileText = pemFileText;
        this.account = new account_1.Account(this.address);
    }
    sync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.account.sync(provider);
            return this;
        });
    }
}
exports.TestWallet = TestWallet;
//# sourceMappingURL=wallets.js.map