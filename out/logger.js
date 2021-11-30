"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Error"] = 4] = "Error";
    LogLevel[LogLevel["None"] = 5] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    static setLevel(logLevel) {
        Logger.logLevel = logLevel;
    }
    static trace(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Debug) {
            return;
        }
        console.debug(message, optionalParams);
    }
    static debug(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Debug) {
            return;
        }
        console.debug(message, optionalParams);
    }
    static info(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Info) {
            return;
        }
        console.log(message, optionalParams);
    }
    static warn(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Warn) {
            return;
        }
        console.warn(message, optionalParams);
    }
    static error(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Error) {
            return;
        }
        console.error(message, optionalParams);
    }
}
exports.Logger = Logger;
Logger.logLevel = LogLevel.Debug;
//# sourceMappingURL=logger.js.map