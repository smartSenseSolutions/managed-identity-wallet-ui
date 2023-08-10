import { DidDocumentType, UserResponse } from "@miw/models";
import { ApiResponse } from "@miw/types/common";
import { deleteAPI, get } from "@miw/utils/ApiManager";
import ENDPOINTS from "@miw/utils/endpoints";
import { parseAPI } from "@miw/utils/helper";

export const getCredentials = (templateParam: {
  // holderId: string;
  type: string;
  size: string | number;
  pageNumber: string | number;
  sortColumn: string;
  sortBy: string;
}) => {
  const queryParams = {};
  if (templateParam.type) {
    queryParams["type"] = templateParam.type;
  }
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

  return get(parseAPI(ENDPOINTS.getCredentails, {}, queryParams));
};

export const deleteCredential = (id: string) => {
  const templateParam = {
    ID: id,
  };
  return deleteAPI(parseAPI(ENDPOINTS.deleteCredentials, templateParam));
};
export const getMyCreds = (identifier: string) => {
  const templateParam = {
    identifier,
  };
  return get(parseAPI(ENDPOINTS.getMyCreds, templateParam));
};
