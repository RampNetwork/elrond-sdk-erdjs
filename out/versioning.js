"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareVersions = void 0;
function compareVersions(versionA, versionB) {
    let i, diff;
    const regExStrip0 = /(\.0+)+$/;
    const segmentsA = versionA.replace(regExStrip0, '').split('.');
    const segmentsB = versionB.replace(regExStrip0, '').split('.');
    const minVersionLength = Math.min(segmentsA.length, segmentsB.length);
    for (i = 0; i < minVersionLength; i++) {
        diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff == 0) {
            continue;
        }
        if (diff < 0) {
            return -1;
        }
        return 1;
    }
    return segmentsA.length - segmentsB.length;
}
exports.compareVersions = compareVersions;
//# sourceMappingURL=versioning.js.map