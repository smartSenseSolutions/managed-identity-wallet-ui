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
