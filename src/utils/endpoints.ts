/**
 Copyright (c) 2023 MIW
 */
const API = "api/";
const ENDPOINTS = {
  didDocument: `:bpn/did.json`,
  getWallets: `${API}wallets?pageNumber=:page&size=:size&sortColumn=:sortColumn&sortTpe=:sortBy`,
  postCreateWallet: `${API}wallets`,
};

export default ENDPOINTS;
