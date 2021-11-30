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
exports.isEmpty = exports.guardEmpty = exports.guardNotEmpty = exports.guardLength = exports.guardSameLength = exports.guardValueIsSetWithMessage = exports.guardValueIsSet = exports.guardType = exports.guardTrue = void 0;
const errors = __importStar(require("./errors"));
// TODO: Create a class called "Guard". Add the following as member functions.
function guardTrue(value, what) {
    if (!value) {
        throw new errors.ErrInvariantFailed(`[<${what}>] isn't true`);
    }
}
exports.guardTrue = guardTrue;
function guardType(name, type, value, allowUndefined = true) {
    if (allowUndefined && value === undefined) {
        return;
    }
    if (value instanceof type) {
        return;
    }
    throw new errors.ErrBadType(name, type, value);
}
exports.guardType = guardType;
// TODO: merge with guardValueIsSetWithMessage
function guardValueIsSet(name, value) {
    guardValueIsSetWithMessage(`${name} isn't set (null or undefined)`, value);
}
exports.guardValueIsSet = guardValueIsSet;
// TODO: merge with guardValueIsSet
function guardValueIsSetWithMessage(message, value) {
    if (value == null || value === undefined) {
        throw new errors.ErrInvariantFailed(message);
    }
}
exports.guardValueIsSetWithMessage = guardValueIsSetWithMessage;
function guardSameLength(a, b) {
    a = a || [];
    b = b || [];
    if (a.length != b.length) {
        throw new errors.ErrInvariantFailed("arrays do not have the same length");
    }
}
exports.guardSameLength = guardSameLength;
function guardLength(withLength, expectedLength) {
    let actualLength = withLength.length || 0;
    if (actualLength != expectedLength) {
        throw new errors.ErrInvariantFailed(`wrong length, expected: ${expectedLength}, actual: ${actualLength}`);
    }
}
exports.guardLength = guardLength;
function guardNotEmpty(value, what) {
    if (isEmpty(value)) {
        throw new errors.ErrInvariantFailed(`${what} is empty`);
    }
}
exports.guardNotEmpty = guardNotEmpty;
function guardEmpty(value, what) {
    if (!isEmpty(value)) {
        throw new errors.ErrInvariantFailed(`${what} is not empty`);
    }
}
exports.guardEmpty = guardEmpty;
function isEmpty(value) {
    if (value.isEmpty) {
        return value.isEmpty();
    }
    return value.length === 0;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=utils.js.map