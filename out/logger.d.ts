export declare enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    None = 5
}
export declare class Logger {
    static logLevel: LogLevel;
    static setLevel(logLevel: LogLevel): void;
    static trace(message?: any, ...optionalParams: any[]): void;
    static debug(message?: any, ...optionalParams: any[]): void;
    static info(message?: any, ...optionalParams: any[]): void;
    static warn(message?: any, ...optionalParams: any[]): void;
    static error(message?: any, ...optionalParams: any[]): void;
}
