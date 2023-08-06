import { DidDocumentType, UserResponse } from "@miw/models";
import { ApiResponse } from "@miw/types/common";
import { get } from "@miw/utils/ApiManager";
import ENDPOINTS from "@miw/utils/endpoints";
import { parseAPI } from "@miw/utils/helper";

export const getDidDocument = (
  bpn: string
): Promise<ApiResponse<DidDocumentType>> => {
  const templateParams = {
    bpn,
  };
  return get(parseAPI(ENDPOINTS.didDocument, templateParams));
};
