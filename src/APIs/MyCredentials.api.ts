import { deleteAPI, get } from "@miw/utils/ApiManager";
import ENDPOINTS from "@miw/utils/endpoints";
import { parseAPI } from "@miw/utils/helper";

export const getCredentials = (templateParam: {
  holderId: string;
  type: string;
  size: string | number;
  pageNumber: string | number;
  sortColumn: string;
  sortBy: string;
}) => {
  const queryParams = {};
  const validParams = [
    "issuerIdentifier",
    "type",
    "size",
    "pageNumber",
    "sortColumn",
    "sortBy",
  ];

  for (const param of validParams) {
    if (templateParam[param]) {
      queryParams[param] = templateParam[param];
    }
  }

  return get(parseAPI(ENDPOINTS.getCredentails, {}, queryParams));
};

export const deleteCredential = (templateParam: { id: string }) => {
  const queryParams = {};
  if (templateParam.id) {
    queryParams["id"] = templateParam.id;
  }
  return deleteAPI(parseAPI(ENDPOINTS.deleteCredentials, {}, queryParams));
};
export const getMyCreds = (identifier: string) => {
  const templateParam = {
    identifier,
  };
  return get(parseAPI(ENDPOINTS.getMyCreds, templateParam));
};
