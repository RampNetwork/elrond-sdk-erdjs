"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugTxData = void 0;
const scArgumentsParser_1 = require("../../scArgumentsParser");
function debugTxData(data) {
    let { functionName, args } = scArgumentsParser_1.ScArgumentsParser.parseSmartContractCallDataField(data);
    let parsedArgs = args.map((rawHex) => {
        let asNumber = parseInt(rawHex, 16);
        let asString = Buffer.from(rawHex, "hex").toString();
        return [asString, asNumber, rawHex];
    });
    return { functionName, parsedArgs };
}
exports.debugTxData = debugTxData;
//# sourceMappingURL=debug.js.map