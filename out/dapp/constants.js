"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WALLETCONNECT_ELROND_CHAIN_ID = exports.LEDGER_TX_HASH_SIGN_MIN_VERSION = exports.WALLET_PROVIDER_CALLBACK_PARAM_TX_SIGNED = exports.WALLET_PROVIDER_CALLBACK_PARAM = exports.WALLET_PROVIDER_SIGN_TRANSACTION_URL = exports.WALLET_PROVIDER_SEND_TRANSACTION_URL = exports.WALLET_PROVIDER_DISCONNECT_URL = exports.WALLET_PROVIDER_CONNECT_URL = exports.DAPP_MESSAGE_SIGN_TRANSACTION_URL = exports.DAPP_MESSAGE_SEND_TRANSACTION_URL = exports.DAPP_MESSAGE_LOG_OUT = exports.DAPP_MESSAGE_CONNECT_URL = exports.DAPP_MESSAGE_GET_ADDRESS = exports.DAPP_MESSAGE_IS_CONNECTED = exports.DAPP_MESSAGE_INIT = exports.DAPP_DEFAULT_TIMEOUT = exports.WALLET_PROVIDER_TESTNET = exports.WALLET_PROVIDER_MAINNET = void 0;
exports.WALLET_PROVIDER_MAINNET = "https://wallet.elrond.com/dapp/init";
exports.WALLET_PROVIDER_TESTNET = "https://testnet-wallet.elrond.com/dapp/init";
// Wallet intercom messages
exports.DAPP_DEFAULT_TIMEOUT = 5000;
exports.DAPP_MESSAGE_INIT = "dapp_message_init";
exports.DAPP_MESSAGE_IS_CONNECTED = "dapp_message_is_connected";
exports.DAPP_MESSAGE_GET_ADDRESS = "dapp_message_get_address";
exports.DAPP_MESSAGE_CONNECT_URL = "dapp_message_connect_url";
exports.DAPP_MESSAGE_LOG_OUT = "dapp_message_log_out";
exports.DAPP_MESSAGE_SEND_TRANSACTION_URL = "dapp_message_send_transaction_url";
exports.DAPP_MESSAGE_SIGN_TRANSACTION_URL = "dapp_message_sign_transaction_url";
exports.WALLET_PROVIDER_CONNECT_URL = "/hook/login";
exports.WALLET_PROVIDER_DISCONNECT_URL = "/hook/logout";
exports.WALLET_PROVIDER_SEND_TRANSACTION_URL = "/hook/transaction";
exports.WALLET_PROVIDER_SIGN_TRANSACTION_URL = "/hook/sign";
exports.WALLET_PROVIDER_CALLBACK_PARAM = "walletProviderStatus";
exports.WALLET_PROVIDER_CALLBACK_PARAM_TX_SIGNED = "transactionsSigned";
// This constant represents the minimum version in which the Elrond Ledger App doesn't support anymore regular
// transactions' signing, and uses transaction's hash signing instead
exports.LEDGER_TX_HASH_SIGN_MIN_VERSION = "1.0.11";
// Wallet Connect ChainId for Elrond blockchain
exports.WALLETCONNECT_ELROND_CHAIN_ID = 508;
//# sourceMappingURL=constants.js.map