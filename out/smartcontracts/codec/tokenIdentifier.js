"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenIdentifierCodec = void 0;
const bytes_1 = require("../typesystem/bytes");
const tokenIdentifier_1 = require("../typesystem/tokenIdentifier");
const bytes_2 = require("./bytes");
class TokenIdentifierCodec {
    constructor() {
        this.bytesCodec = new bytes_2.BytesBinaryCodec();
    }
    decodeNested(buffer) {
        let [bytesValue, length] = this.bytesCodec.decodeNested(buffer);
        return [new tokenIdentifier_1.TokenIdentifierValue(bytesValue.valueOf()), length];
    }
    decodeTopLevel(buffer) {
        let bytesValue = this.bytesCodec.decodeTopLevel(buffer);
        return new tokenIdentifier_1.TokenIdentifierValue(bytesValue.valueOf());
    }
    encodeNested(tokenIdentifier) {
        let bytesValue = new bytes_1.BytesValue(tokenIdentifier.valueOf());
        return this.bytesCodec.encodeNested(bytesValue);
    }
    encodeTopLevel(tokenIdentifier) {
        return tokenIdentifier.valueOf();
    }
}
exports.TokenIdentifierCodec = TokenIdentifierCodec;
//# sourceMappingURL=tokenIdentifier.js.map