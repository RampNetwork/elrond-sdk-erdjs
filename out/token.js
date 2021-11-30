"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const address_1 = require("./address");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Fungible"] = 0] = "Fungible";
    TokenType[TokenType["Semifungible"] = 1] = "Semifungible";
    TokenType[TokenType["Nonfungible"] = 2] = "Nonfungible";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
class Token {
    constructor(init) {
        this.identifier = ''; // Token identifier (ticker + random string, eg. MYTOKEN-12345)
        this.name = ''; // Token name (eg. MyTokenName123)
        this.type = TokenType.Fungible;
        this.owner = new address_1.Address();
        this.minted = new bignumber_js_1.default(0);
        this.burnt = new bignumber_js_1.default(0);
        this.decimals = 18;
        this.isPaused = false;
        this.canUpgrade = false;
        this.canMint = false;
        this.canBurn = false;
        this.canChangeOwner = false;
        this.canPause = false;
        this.canFreeze = false;
        this.canWipe = false;
        this.canAddSpecialRoles = false;
        this.canTransferNftCreateRole = false;
        this.nftCreateStopped = false;
        this.wiped = false;
        Object.assign(this, init);
    }
    static fromHttpResponse(response) {
        return new Token({
            identifier: response.token,
            name: response.name,
            type: TokenType[response.type],
            owner: new address_1.Address(response.owner),
            minted: new bignumber_js_1.default(response.minted),
            burnt: new bignumber_js_1.default(response.burnt),
            decimals: response.decimals,
            isPaused: response.isPaused,
            canUpgrade: response.canUpgrade,
            canMint: response.canMint,
            canBurn: response.canBurn,
            canChangeOwner: response.canChangeOwner,
            canPause: response.canPause,
            canFreeze: response.canFreeze,
            canWipe: response.canWipe,
        });
    }
    static fromTokenProperties(tokenIdentifier, results) {
        let [tokenName, tokenType, owner, totalMinted, totalBurned, ...propertiesBuffers] = results;
        let properties = parseTokenProperties(propertiesBuffers);
        return new Token({
            identifier: tokenIdentifier,
            type: TokenType[tokenType.toString()],
            name: tokenName.toString(),
            owner,
            minted: new bignumber_js_1.default(totalMinted),
            burnt: new bignumber_js_1.default(totalBurned),
            decimals: properties.NumDecimals.toNumber(),
            isPaused: properties.IsPaused,
            canUpgrade: properties.CanUpgrade,
            canMint: properties.CanMint,
            canBurn: properties.CanBurn,
            canChangeOwner: properties.CanChangeOwner,
            canPause: properties.CanPause,
            canFreeze: properties.CanFreeze,
            canWipe: properties.CanWipe,
            canAddSpecialRoles: properties.CanAddSpecialRoles,
            canTransferNftCreateRole: properties.CanTransferNFTCreateRole,
            nftCreateStopped: properties.NFTCreateStopped,
            wiped: properties.NumWiped
        });
    }
    getTokenName() {
        return this.name;
    }
    typeAsString() {
        return TokenType[this.type];
    }
    getTokenIdentifier() {
        return this.identifier;
    }
    isEgld() {
        return this.getTokenIdentifier() == "EGLD";
    }
    isFungible() {
        return !this.isNft();
    }
    isNft() {
        switch (this.type) {
            case TokenType.Fungible:
                return false;
            case TokenType.Semifungible:
            case TokenType.Nonfungible:
                return true;
        }
    }
}
exports.Token = Token;
function parseValue(value) {
    switch (value) {
        case "true": return true;
        case "false": return false;
        default: return new bignumber_js_1.default(value);
    }
}
function parseTokenProperties(propertiesBuffers) {
    let properties = {};
    for (let buffer of propertiesBuffers) {
        let [name, value] = buffer.toString().split("-");
        properties[name] = parseValue(value);
    }
    return properties;
}
//# sourceMappingURL=token.js.map