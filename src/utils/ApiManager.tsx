/**
 Copyright (c) 2023 MIW
 */

import axios, { AxiosRequestConfig, AxiosRequestHeaders, ResponseType } from 'axios';
import { ACCESS_TOKEN_KEY } from './constant';
import {
    existKeyInStore,
    getActualResponseFromAxiosRequest,
    getAuthToken,
    redirectToLogin,
    removeFromStore,
    removeSelectedEnterpriseId,
    returnParsedJson,
} from './helper';
import { getAlert } from '@miw/hooks';

const defaultHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
};

let loaderCount = 0;

const axiosInstance = axios.create({
    // @ts-ignore
    baseURL: import.meta.env ? import.meta.env.VITE_API_BASE : process.env.VITE_API_BASE,
    headers: {
        ...defaultHeaders,
    },
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (existKeyInStore(ACCESS_TOKEN_KEY)) {
        const tokenObject = getAuthToken();
        const token = tokenObject.t || '';
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data) return response.data;
    },
    (error) => {
        if (error && error.response && error.response.status === 401) {
            removeFromStore(ACCESS_TOKEN_KEY);
            redirectToLogin();
            //TODO: need to change from enterprizeID to according to data after discussion with backend
            removeSelectedEnterpriseId();
            return Promise.reject({ show: false });
        } else if (error && error.status === 400) {
            getAlert('apiError', error.title, 'top-right', false, error);
        }

        const parsedJson = returnParsedJson(getActualResponseFromAxiosRequest(error));
        if (!parsedJson) {
            if (error.message === 'Network Error') {
                return Promise.reject({ show: false });
            }
            return Promise.reject(error);
        }
        return Promise.reject(JSON.parse(getActualResponseFromAxiosRequest(error)));
    },
);

const get = async (
    endpoint: string,
    headers: AxiosRequestHeaders = {},
    showLoader: boolean = true,
    showSuccessAlert: boolean = false,
    hideFailureAlert: boolean = false,
    hideFailureAlertForAllCase: boolean = false,
    param: unknown = {},
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .get(endpoint, {
            headers: {
                ...headers,
            },
            params: {
                ...param,
            },
        })
        .then((resp: unknown) => {
            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            if (error && error.message && error.status !== 404 && !hideFailureAlert && !hideFailureAlertForAllCase) {
                getAlert('apiError', error.title, 'top-right', false, error);
            } else if (error && error.status === 400) {
                getAlert('apiError', error.title, 'top-right', false, error);
            }
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const post = async (
    endpoint: string,
    data: unknown = {},
    customHeaders: AxiosRequestHeaders = {},
    showLoader: boolean = true,
    showSuccessAlert: boolean = true,
    showErrorAlert: boolean = true,
    scrollToTop: boolean = false,
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .post(endpoint, data, {
            headers: {
                ...customHeaders,
            },
        })
        .then((resp: unknown) => {
            //   if (scrollToTop) containerScrollToTop();

            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            if (error && error.status === 400) {
                getAlert('apiError', error.title, 'top-right', false, error);
            }
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const put = async (
    endpoint: string,
    data: unknown = {},
    customHeaders: AxiosRequestHeaders = {},
    showLoader: boolean = true,
    showSuccessAlert: boolean = true,
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .put(endpoint, data, {
            headers: {
                ...customHeaders,
            },
        })
        .then((resp: unknown) => {
            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            if (error && error.status === 400) {
                getAlert('apiError', error.title, 'top-right', false, error);
            }
            showErrorAlertMessage(error);
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const deleteAPI = async (
    endpoint: string,
    data?: unknown,
    customHeaders: AxiosRequestHeaders = {},
    showLoader: boolean = true,
    showSuccessAlert: boolean = true,
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .delete(endpoint, {
            headers: { ...customHeaders },
            data: data,
        })
        .then((resp: unknown) => {
            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            if (error && error.status === 400) {
                getAlert('apiError', error.title, 'top-right', false, error);
            }
            showErrorAlertMessage(error);
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const getBlob = async (
    endpoint: string,
    headers: AxiosRequestHeaders = {},
    showLoader: boolean = true,
    showSuccessAlert: boolean = false,
    onDownloadProgress?: (event: ProgressEvent) => unknown,
    signal?: AbortSignal,
    param: unknown = {},
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .get(endpoint, {
            headers: {
                ...headers,
            },
            params: {
                ...param,
            },
            responseType: 'blob',
            onDownloadProgress,
            signal: signal,
        })
        .then((resp: unknown) => {
            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            if (error && error.message && error.message !== 'canceled') {
                // getAlert("error", error.message);
            }
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const postBlob = async (
    endpoint: string,
    params: unknown = {},
    customHeaders: AxiosRequestHeaders = {},
    responseType: ResponseType,
    onDownloadProgress?: (event: ProgressEvent) => unknown,
    onUploadProgress?: (event: ProgressEvent) => unknown,
    signal?: AbortSignal,
    showLoader: boolean = true,
    showSuccessAlert: boolean = true,
    showErrorAlert: boolean = true,
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .post(endpoint, params, {
            headers: {
                ...customHeaders,
            },
            responseType: responseType,
            onDownloadProgress,
            onUploadProgress,
            signal: signal,
        })
        .then((resp: unknown) => {
            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            if (error && error.message && showErrorAlert === true) {
                // getAlert("error", error.message);
            }
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const patch = async (
    endpoint: string,
    data: unknown = {},
    customHeaders: AxiosRequestHeaders = {},
    showLoader: boolean = true,
    showSuccessAlert: boolean = true,
) => {
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .patch(endpoint, data, {
            headers: {
                ...customHeaders,
            },
        })
        .then((resp: unknown) => {
            showSuccessAlertMessage(showSuccessAlert, resp);
            return resp;
        })
        .catch((error) => {
            showErrorAlertMessage(error);
            throw error;
        })
        .finally(() => {
            showLoadingDisplay(showLoader);
        });
};

const getAxiosInstance = () => {
    return axiosInstance;
};

//helper function to show/hide the loader
const showLoading = () => {
    const linearLoader = document.getElementsByClassName('linearLoader');
    if (linearLoader && linearLoader.length > 0) {
        loaderCount += 1;
        linearLoader[0].classList.remove('d-none');
    }
};

const hideLoading = () => {
    const linearLoader = document.getElementsByClassName('linearLoader');
    loaderCount -= 1;
    if (linearLoader && linearLoader.length > 0 && loaderCount <= 0) {
        linearLoader[0].classList.add('d-none');
    }
};

const showSuccessAlertMessage = (showSuccessAlert: boolean, resp: unknown) => {
    if (showSuccessAlert && resp && resp.message && typeof resp.message === 'string' && resp.show === true) {
        // getAlert("success", resp.message);
    }
};

const showErrorAlertMessage = (error: unknown) => {
    if (error && error.message) {
        // getAlert("error", error.message);
    }
};

const showLoadingDisplay = (showLoader: boolean) => {
    if (showLoader) {
        hideLoading();
    }
};

export { get, post, put, deleteAPI, patch, getBlob, postBlob, getAxiosInstance };
