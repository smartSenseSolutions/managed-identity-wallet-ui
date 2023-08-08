/**
 Copyright (c) 2023 MIW
 */
const API = "api/";
const ENDPOINTS = {
  didDocument: `:bpn/did.json`,
  getWallets: `${API}wallets?pageNumber=:page&size=:size&sortColumn=:sortColumn&sortTpe=:sortBy`,
  postCreateWallet: `${API}wallets`,
  getWalletByRoot: `${API}credentials/issuer?pageNumber=:page&sortColumn=:sortColumn&sortTpe=:sortBy`,
  postIssueWallet: `${API}credentials/issuer//issuer?holderDid=:holderDid`,
  postIssueMembership: `${API}credentials/issuer/membership`,
  postIssueFramework: `${API}credentials/issuer/framework`,
  postIssueDismantler: `${API}credentials/issuer/dismantler`,
};

export default ENDPOINTS;
