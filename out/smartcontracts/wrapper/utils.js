"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minutes = exports.hours = exports.now = exports.minutesToNonce = exports.printList = exports.print = void 0;
function print(balance) {
    let nonceString = balance.token.isFungible() ? '' : ` nonce: ${balance.getNonce()}`;
    console.log(`${balance.toCurrencyString()}${nonceString}`);
}
exports.print = print;
function printList(balanceList) {
    balanceList.forEach((balance) => print(balance));
}
exports.printList = printList;
function minutesToNonce(minutes) {
    // the nonce is incremented every 6 seconds - in a minute the nonce increases by 10
    return minutes * 10;
}
exports.minutesToNonce = minutesToNonce;
function now() {
    return Math.floor(Date.now() / 1000);
}
exports.now = now;
function hours(hours) {
    let asMinutes = hours * 60;
    return minutes(asMinutes);
}
exports.hours = hours;
function minutes(minutes) {
    let seconds = minutes * 60;
    return seconds;
}
exports.minutes = minutes;
//# sourceMappingURL=utils.js.map