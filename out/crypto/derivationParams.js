"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryptKeyDerivationParams = void 0;
const scryptsy_1 = __importDefault(require("scryptsy"));
class ScryptKeyDerivationParams {
    constructor(n = 4096, r = 8, p = 1, dklen = 32) {
        /**
         * numIterations
         */
        this.n = 4096;
        /**
         * memFactor
         */
        this.r = 8;
        /**
         * pFactor
         */
        this.p = 1;
        this.dklen = 32;
        this.n = n;
        this.r = r;
        this.p = p;
        this.dklen = dklen;
    }
    /**
     * Will take about:
     *  - 80-90 ms in Node.js, on a i3-8100 CPU @ 3.60GHz
     *  - 350-360 ms in browser (Firefox), on a i3-8100 CPU @ 3.60GHz
     */
    generateDerivedKey(password, salt) {
        return scryptsy_1.default(password, salt, this.n, this.r, this.p, this.dklen);
    }
}
exports.ScryptKeyDerivationParams = ScryptKeyDerivationParams;
//# sourceMappingURL=derivationParams.js.map