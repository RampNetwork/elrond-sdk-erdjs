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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntValue = exports.BigUIntValue = exports.I64Value = exports.U64Value = exports.I32Value = exports.U32Value = exports.I16Value = exports.U16Value = exports.I8Value = exports.U8Value = exports.NumericalValue = exports.BigIntType = exports.BigUIntType = exports.I64Type = exports.U64Type = exports.I32Type = exports.U32Type = exports.I16Type = exports.U16Type = exports.I8Type = exports.U8Type = exports.NumericalType = void 0;
const errors = __importStar(require("../../errors"));
const utils_1 = require("../../utils");
const types_1 = require("./types");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class NumericalType extends types_1.PrimitiveType {
    constructor(name, sizeInBytes, withSign) {
        super(name);
        this.sizeInBytes = sizeInBytes;
        this.withSign = withSign;
    }
    hasFixedSize() {
        return this.sizeInBytes ? true : false;
    }
    hasArbitrarySize() {
        return !this.hasFixedSize();
    }
}
exports.NumericalType = NumericalType;
class U8Type extends NumericalType {
    constructor() {
        super("u8", 1, false);
    }
}
exports.U8Type = U8Type;
class I8Type extends NumericalType {
    constructor() {
        super("i8", 1, true);
    }
}
exports.I8Type = I8Type;
class U16Type extends NumericalType {
    constructor() {
        super("u16", 2, false);
    }
}
exports.U16Type = U16Type;
class I16Type extends NumericalType {
    constructor() {
        super("i16", 2, true);
    }
}
exports.I16Type = I16Type;
class U32Type extends NumericalType {
    constructor() {
        super("u32", 4, false);
    }
}
exports.U32Type = U32Type;
class I32Type extends NumericalType {
    constructor() {
        super("i32", 4, true);
    }
}
exports.I32Type = I32Type;
class U64Type extends NumericalType {
    constructor() {
        super("u64", 8, false);
    }
}
exports.U64Type = U64Type;
class I64Type extends NumericalType {
    constructor() {
        super("i64", 8, true);
    }
}
exports.I64Type = I64Type;
class BigUIntType extends NumericalType {
    constructor() {
        super("BigUint", 0, false);
    }
}
exports.BigUIntType = BigUIntType;
class BigIntType extends NumericalType {
    constructor() {
        super("Bigint", 0, true);
    }
}
exports.BigIntType = BigIntType;
/**
 * A numerical value fed to or fetched from a Smart Contract contract, as a strongly-typed, immutable abstraction.
 */
class NumericalValue extends types_1.PrimitiveValue {
    constructor(type, value) {
        super(type);
        utils_1.guardType("type", NumericalType, type, false);
        if (!(value instanceof bignumber_js_1.default)) {
            throw new errors.ErrInvalidArgument("value", value, "not a big number");
        }
        this.value = value;
        this.sizeInBytes = type.sizeInBytes;
        this.withSign = type.withSign;
        if (!this.withSign && value.isNegative()) {
            throw new errors.ErrInvalidArgument("value", value.toString(10), "negative, but type is unsigned");
        }
    }
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another NumericalValue
     */
    equals(other) {
        return this.value.isEqualTo(other.value);
    }
    valueOf() {
        return this.value;
    }
}
exports.NumericalValue = NumericalValue;
class U8Value extends NumericalValue {
    constructor(value) {
        super(new U8Type(), new bignumber_js_1.default(value));
    }
}
exports.U8Value = U8Value;
class I8Value extends NumericalValue {
    constructor(value) {
        super(new I8Type(), new bignumber_js_1.default(value));
    }
}
exports.I8Value = I8Value;
class U16Value extends NumericalValue {
    constructor(value) {
        super(new U16Type(), new bignumber_js_1.default(value));
    }
}
exports.U16Value = U16Value;
class I16Value extends NumericalValue {
    constructor(value) {
        super(new I16Type(), new bignumber_js_1.default(value));
    }
}
exports.I16Value = I16Value;
class U32Value extends NumericalValue {
    constructor(value) {
        super(new U32Type(), new bignumber_js_1.default(value));
    }
}
exports.U32Value = U32Value;
class I32Value extends NumericalValue {
    constructor(value) {
        super(new I32Type(), new bignumber_js_1.default(value));
    }
}
exports.I32Value = I32Value;
class U64Value extends NumericalValue {
    constructor(value) {
        super(new U64Type(), value);
    }
}
exports.U64Value = U64Value;
class I64Value extends NumericalValue {
    constructor(value) {
        super(new I64Type(), value);
    }
}
exports.I64Value = I64Value;
class BigUIntValue extends NumericalValue {
    constructor(value) {
        super(new BigUIntType(), value);
    }
}
exports.BigUIntValue = BigUIntValue;
class BigIntValue extends NumericalValue {
    constructor(value) {
        super(new BigIntType(), value);
    }
}
exports.BigIntValue = BigIntValue;
//# sourceMappingURL=numerical.js.map