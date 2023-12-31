import { DidDocumentType } from '@miw/models';
import { ApiResponse } from '@miw/types/common';
import { get, post } from '@miw/utils/ApiManager';
import ENDPOINTS from '@miw/utils/endpoints';
import { parseAPI } from '@miw/utils/helper';

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
    holderId: string;
    vcType: string;
    size: string | number;
    pageNumber: string | number;
    sortColumn: string;
    sortBy: string;
}) => {
    const queryParams = {};

    if (templateParam.size) {
        queryParams['size'] = templateParam.size;
    }
    if (templateParam.pageNumber) {
        queryParams['pageNumber'] = templateParam.pageNumber;
    }
    if (templateParam.sortColumn) {
        queryParams['sortColumn'] = templateParam.sortColumn;
    }
    if (templateParam.sortBy) {
        queryParams['sortBy'] = templateParam.sortBy;
    }
    if (templateParam.holderId) {
        queryParams['holderIdentifier'] = templateParam.holderId;
    }
    if (templateParam.vcType) {
        queryParams['type'] = templateParam.vcType;
    }

    return get(parseAPI(ENDPOINTS.getWalletByRoot, {}, queryParams));
};

export const postIssueGenericCredential = (templateParam: { holderDid: string; revocable: string }, param: object) => {
    const queryParams = {};

    if (templateParam.holderDid) {
        queryParams['holderDid'] = templateParam.holderDid;
    }
    if (templateParam.revocable) {
        queryParams['revocable'] = templateParam.revocable;
    }

    return post(parseAPI(ENDPOINTS.postIssueWallet, {}, queryParams), param);
};
export const postIssueMembership = (param: { bpn: string }) => {
    return post(ENDPOINTS.postIssueMembership, param);
};
export const postIssueFramework = (param: {
    holderIdentifier: string;
    type: string;
    'contract-template': string;
    'contract-version': string;
}) => {
    return post(ENDPOINTS.postIssueFramework, param);
};
export const postIssueDismantler = (param: { bpn: string; activityType: string; allowedVehicleBrands: string[] }) => {
    return post(ENDPOINTS.postIssueDismantler, param);
};

export const postValidateCreds = (templateParam: { withCreds: string , withRevocation: string}, param: object) => {
    return post(parseAPI(ENDPOINTS.postValidateCreds, templateParam), param);
};

export const postValidatePresentation = (
    templateParam: {
        audience: string;
        asJwt: string;
        withCredentialExpiryDate: string;
        withCredentialRevocation: string
    },
    param: object,
) => {
    const queryParams = {};
    if (templateParam.audience) {
        queryParams['audience'] = templateParam.audience;
    }
    if (templateParam.asJwt) {
        queryParams['asJwt'] = templateParam.asJwt;
    }
    if (templateParam.withCredentialExpiryDate) {
        queryParams['withCredentialExpiryDate'] = templateParam.withCredentialExpiryDate;
    }

    if (templateParam.withCredentialRevocation) {
        queryParams['withCredentialRevocation'] = templateParam.withCredentialRevocation;
    }
    return post(parseAPI(ENDPOINTS.postValidatePresentation, {}, queryParams), param);
};

export const createPresentation = (
    templateParam: {
        withCreds: string;
        audience: string;
        withCredentialRevocation: string
        withCredentialExpiryDate: string;
    },
    param: object,
) => {
    const queryParams = {};
    if (templateParam.withCreds) {
        queryParams['asJwt'] = templateParam.withCreds;
    }
    if (templateParam.withCreds && templateParam.audience) {
        queryParams['audience'] = templateParam.audience;
    }

    if (templateParam.withCredentialRevocation) {
        queryParams['withCredentialRevocation'] = templateParam.withCredentialRevocation.value;
    }

    if (templateParam.withCredentialExpiryDate) {
        queryParams['withCredentialExpiryDate'] = templateParam.withCredentialExpiryDate.value;
    }
    return post(parseAPI(ENDPOINTS.postCreatePresantation, {}, queryParams), param);
};

export const postRevokeCreds = (param) => {
    return post(ENDPOINTS.revokeCreds, param);
};
