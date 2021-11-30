/// <reference types="node" />
export declare class ScryptKeyDerivationParams {
    /**
     * numIterations
     */
    n: number;
    /**
     * memFactor
     */
    r: number;
    /**
     * pFactor
     */
    p: number;
    dklen: number;
    constructor(n?: number, r?: number, p?: number, dklen?: number);
    /**
     * Will take about:
     *  - 80-90 ms in Node.js, on a i3-8100 CPU @ 3.60GHz
     *  - 350-360 ms in browser (Firefox), on a i3-8100 CPU @ 3.60GHz
     */
    generateDerivedKey(password: Buffer, salt: Buffer): Buffer;
}
