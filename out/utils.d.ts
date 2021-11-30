export declare function guardTrue(value: boolean, what: string): void;
export declare function guardType(name: string, type: any, value?: any, allowUndefined?: boolean): void;
export declare function guardValueIsSet(name: string, value?: any | null | undefined): void;
export declare function guardValueIsSetWithMessage(message: string, value?: any | null | undefined): void;
export declare function guardSameLength(a: any[], b: any[]): void;
export declare function guardLength(withLength: {
    length?: number;
}, expectedLength: number): void;
export declare function guardNotEmpty(value: {
    isEmpty?: () => boolean;
    length?: number;
}, what: string): void;
export declare function guardEmpty(value: {
    isEmpty?: () => boolean;
    length?: number;
}, what: string): void;
export declare function isEmpty(value: {
    isEmpty?: () => boolean;
    length?: number;
}): boolean;
