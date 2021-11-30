/// <reference types="node" />
import { Randomness } from "./randomness";
import { EncryptedData } from "./encryptedData";
export declare class Encryptor {
    static encrypt(data: Buffer, password: string, randomness?: Randomness): EncryptedData;
}
