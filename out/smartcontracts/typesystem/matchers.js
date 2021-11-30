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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPrimitiveTypeSelect = exports.onPrimitiveValueSelect = exports.onTypedValueSelect = exports.onTypeSelect = void 0;
const errors = __importStar(require("../../errors"));
const address_1 = require("./address");
const boolean_1 = require("./boolean");
const bytes_1 = require("./bytes");
const enum_1 = require("./enum");
const generic_1 = require("./generic");
const h256_1 = require("./h256");
const numerical_1 = require("./numerical");
const struct_1 = require("./struct");
const tokenIdentifier_1 = require("./tokenIdentifier");
const tuple_1 = require("./tuple");
const types_1 = require("./types");
// TODO: Extend functionality or rename wrt. restricted / reduced functionality (not all types are handled: composite, variadic).
function onTypeSelect(type, selectors) {
    if (type instanceof generic_1.OptionType) {
        return selectors.onOption();
    }
    if (type instanceof generic_1.ListType) {
        return selectors.onList();
    }
    if (type instanceof types_1.PrimitiveType) {
        return selectors.onPrimitive();
    }
    if (type instanceof struct_1.StructType) {
        return selectors.onStruct();
    }
    if (type instanceof tuple_1.TupleType) {
        return selectors.onTuple();
    }
    if (type instanceof enum_1.EnumType) {
        return selectors.onEnum();
    }
    if (selectors.onOther) {
        return selectors.onOther();
    }
    throw new errors.ErrTypingSystem(`type isn't known: ${type}`);
}
exports.onTypeSelect = onTypeSelect;
function onTypedValueSelect(value, selectors) {
    if (value instanceof types_1.PrimitiveValue) {
        return selectors.onPrimitive();
    }
    if (value instanceof generic_1.OptionValue) {
        return selectors.onOption();
    }
    if (value instanceof generic_1.List) {
        return selectors.onList();
    }
    if (value instanceof struct_1.Struct) {
        return selectors.onStruct();
    }
    if (value instanceof tuple_1.Tuple) {
        return selectors.onTuple();
    }
    if (value instanceof enum_1.EnumValue) {
        return selectors.onEnum();
    }
    if (selectors.onOther) {
        return selectors.onOther();
    }
    throw new errors.ErrTypingSystem(`value isn't typed: ${value}`);
}
exports.onTypedValueSelect = onTypedValueSelect;
function onPrimitiveValueSelect(value, selectors) {
    if (value instanceof boolean_1.BooleanValue) {
        return selectors.onBoolean();
    }
    if (value instanceof numerical_1.NumericalValue) {
        return selectors.onNumerical();
    }
    if (value instanceof address_1.AddressValue) {
        return selectors.onAddress();
    }
    if (value instanceof bytes_1.BytesValue) {
        return selectors.onBytes();
    }
    if (value instanceof h256_1.H256Value) {
        return selectors.onH256();
    }
    if (value instanceof tokenIdentifier_1.TokenIdentifierValue) {
        return selectors.onTypeIdentifier();
    }
    if (selectors.onOther) {
        return selectors.onOther();
    }
    throw new errors.ErrTypingSystem(`value isn't a primitive: ${value.getType()}`);
}
exports.onPrimitiveValueSelect = onPrimitiveValueSelect;
function onPrimitiveTypeSelect(type, selectors) {
    if (type instanceof boolean_1.BooleanType) {
        return selectors.onBoolean();
    }
    if (type instanceof numerical_1.NumericalType) {
        return selectors.onNumerical();
    }
    if (type instanceof address_1.AddressType) {
        return selectors.onAddress();
    }
    if (type instanceof bytes_1.BytesType) {
        return selectors.onBytes();
    }
    if (type instanceof h256_1.H256Type) {
        return selectors.onH256();
    }
    if (type instanceof tokenIdentifier_1.TokenIdentifierType) {
        return selectors.onTokenIndetifier();
    }
    if (selectors.onOther) {
        return selectors.onOther();
    }
    throw new errors.ErrTypingSystem(`type isn't a known primitive: ${type}`);
}
exports.onPrimitiveTypeSelect = onPrimitiveTypeSelect;
//# sourceMappingURL=matchers.js.map