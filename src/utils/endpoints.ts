/**
 Copyright (c) 2023 MIW
 */
const API = "api/";
const ENDPOINTS = {
  didDocument: `:bpn/did.json`,
  getWallets: `${API}wallets?pageNumber=:page&size=:size&sortColumn=:sortColumn&sortTpe=:sortBy`,
  postCreateWallet: `${API}wallets`,
  getWalletByRoot: `${API}credentials/issuer`,
  postIssueWallet: `${API}credentials/issuer`,
  postIssueMembership: `${API}credentials/issuer/membership`,
  postIssueFramework: `${API}credentials/issuer/framework`,
  postIssueDismantler: `${API}credentials/issuer/dismantler`,
  postValidateCreds: `${API}credentials/validation?withCredentialExpiryDate=:withCreds`,
  getMyCreds: `${API}wallets/:identifier`,
  getWalletDetails: `${API}didDocuments/:identifier`,
  postCreatePresantation: `${API}presentations`,
  getCredentails: `${API}credentials`,
  deleteCredentials: `${API}credentials?id=:ID`,
  revokeCreds: `${API}credentials/revoke`,
};

export default ENDPOINTS;
