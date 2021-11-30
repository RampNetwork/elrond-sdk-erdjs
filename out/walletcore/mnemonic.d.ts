import { UserSecretKey } from "./userKeys";
export declare class Mnemonic {
    private readonly text;
    private constructor();
    static generate(): Mnemonic;
    static fromString(text: string): Mnemonic;
    private static assertTextIsValid;
    deriveKey(addressIndex?: number, password?: string): UserSecretKey;
    getWords(): string[];
    toString(): string;
}
