"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTToken = void 0;
class NFTToken {
    constructor(init) {
        this.token = '';
        this.name = '';
        this.type = '';
        this.owner = '';
        this.minted = '';
        this.burnt = '';
        this.decimals = 0;
        this.isPaused = false;
        this.canUpgrade = false;
        this.canMint = false;
        this.canBurn = false;
        this.canChangeOwner = false;
        this.canPause = false;
        this.canFreeze = false;
        this.canWipe = false;
        this.canAddSpecialRoles = false;
        this.canTransferNFTCreateRole = false;
        this.NFTCreateStopped = false;
        this.wiped = '0';
        Object.assign(this, init);
    }
    static fromHttpResponse(response) {
        let nftToken = new NFTToken(response);
        return nftToken;
    }
    getTokenName() {
        return this.name;
    }
    getTokenIdentifier() {
        return this.token;
    }
    getTokenType() {
        return this.type;
    }
}
exports.NFTToken = NFTToken;
//# sourceMappingURL=nftToken.js.map