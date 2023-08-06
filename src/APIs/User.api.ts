import { UserResponse } from "@miw/models";
import { ApiResponse } from "@miw/types/common";
import { get } from "@miw/utils/ApiManager";
import ENDPOINTS from "@miw/utils/endpoints";

export const callGetUser = (): Promise<ApiResponse<UserResponse>> =>
  get("https://dev.fosterclub.io/account/api/v1/user", {}, true, false, true);
