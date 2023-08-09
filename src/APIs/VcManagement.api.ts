import { DidDocumentType, UserResponse } from "@miw/models";
import { ApiResponse } from "@miw/types/common";
import { get, post } from "@miw/utils/ApiManager";
import ENDPOINTS from "@miw/utils/endpoints";
import { parseAPI } from "@miw/utils/helper";

export const getWalletList = (templateParams: {
  page: string | number;
  size: string | number;
  sortColumn: string;
  sortBy: string;
}): Promise<ApiResponse<DidDocumentType>> => {
  //   const templateParams = {
  //     page,
  //     size,
  //     sortColumn,
  //     sortBy,
  //   };
  return get(parseAPI(ENDPOINTS.getWallets, templateParams));
};

export const getWalletDetails = (bpn: string) => {
  const templateParam = {
    identifier: bpn,
  };
  return get(parseAPI(ENDPOINTS.getWalletDetails, templateParam));
};

export const postCreateWallet = (param: { bpn: string; name: string }) => {
  return post(ENDPOINTS.postCreateWallet, param);
};

export const getWalletByRoot = (templateParam: {
  // holderId: string;
  // vcType: string;
  size: string | number;
  pageNumber: string | number;
  sortColumn: string;
  sortBy: string;
}) => {
  const queryParams = {};

  if (templateParam.size) {
    queryParams["size"] = templateParam.size;
  }
  if (templateParam.pageNumber) {
    queryParams["pageNumber"] = templateParam.pageNumber;
  }
  if (templateParam.sortColumn) {
    queryParams["sortColumn"] = templateParam.sortColumn;
  }
  if (templateParam.sortBy) {
    queryParams["sortBy"] = templateParam.sortBy;
  }

  return get(parseAPI(ENDPOINTS.getWalletByRoot, {}, queryParams));
};

export const postIssueGenericCredential = (
  templateParam: { holderDid: string },
  param: object
) => {
  const queryParams = {};

  if (templateParam.holderDid) {
    queryParams["holderDid"] = templateParam.holderDid;
  }

  return post(parseAPI(ENDPOINTS.postIssueWallet, {}, queryParams), param);
};
export const postIssueMembership = (param: { bpn: string }) => {
  return post(ENDPOINTS.postIssueMembership, param);
};
export const postIssueFramework = (param: {
  holderIdentifier: string;
  type: string;
  "contract-template": string;
  "contract-version": string;
}) => {
  return post(ENDPOINTS.postIssueFramework, param);
};
export const postIssueDismantler = (param: {
  bpn: string;
  activityType: string;
  allowedVehicleBrands: string[];
}) => {
  return post(ENDPOINTS.postIssueDismantler, param);
};

export const postValidateCreds = (
  templateParam: { withCreds: string },
  param: object
) => {
  return post(parseAPI(ENDPOINTS.postValidateCreds, templateParam), param);
};
export const createPresentation = (templateParam: { withCreds: string }) => {
  const queryParams = {};
  if (templateParam.withCreds) {
    queryParams["withCreds"] = templateParam.withCreds;
  }
  return get(ENDPOINTS.postCreatePresantation);
};

export const postRevokeCreds = (param) => {
  return post(ENDPOINTS.revokeCreds, param);
};
