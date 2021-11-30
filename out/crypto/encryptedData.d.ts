import { ScryptKeyDerivationParams } from "./derivationParams";
export declare class EncryptedData {
    id: string;
    version: number;
    cipher: string;
    ciphertext: string;
    iv: string;
    kdf: string;
    kdfparams: ScryptKeyDerivationParams;
    salt: string;
    mac: string;
    constructor(data: Omit<EncryptedData, "toJSON">);
    toJSON(): any;
    static fromJSON(data: any): EncryptedData;
}
