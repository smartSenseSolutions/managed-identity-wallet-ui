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

export const postCreateWallet = (param: { bpn: string; name: string }) => {
  return post(ENDPOINTS.postCreateWallet, param);
};

export const getWalletByRoot = (templateParam: {
  // holderId: string;
  // vcType: string;
  page: string | number;
  sortColumn: string;
  sortBy: string;
}) => {
  return get(parseAPI(ENDPOINTS.getWalletByRoot, templateParam));
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
