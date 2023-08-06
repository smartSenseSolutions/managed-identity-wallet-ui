/**
 Copyright (c) 2023 MIW
 */
import { AxiosError } from "axios";
import {
  ACCESS_TOKEN_KEY,
  REDIRECT_LOGIN,
  SELECTED_ENTITY_LOCAL_STORAGE_KEY,
} from "./constant";
import { isBuildingUsingVite } from "./Envirement";

export const redirectToLogin = () => {
  location.replace(`${REDIRECT_LOGIN}`);
};
export const getFromLocalstorage = (key: string) => {
  try {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {}
};

export const getFromStore = (key: string): any => {
  const item = localStorage.getItem(key);
  try {
    // @ts-ignore
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
};
export const clearLastSelectedEntity = (): void => {
  window.localStorage.removeItem(SELECTED_ENTITY_LOCAL_STORAGE_KEY);
};

export const removeFromStore = (key: string) => {
  const item = getFromLocalstorage(key);
  clearLastSelectedEntity();
  if (item) {
    localStorage.removeItem(key);
    return true;
  } else {
    return false;
  }
};
export const removeSelectedEnterpriseId = () => {
  return localStorage.removeItem("see");
};

export const redirectToVerifyEmail = () => {
  const url = isBuildingUsingVite() ? import.meta.env.VITE_VERIFY_OTP_PAGE : "";
  location.replace(`${url}?from=${location.href}`);
};

export const existKeyInStore = (key: string) => {
  const item = getFromLocalstorage(key);
  if (item) {
    return true;
  } else {
    return false;
  }
};
export const getAuthToken = () => {
  const token = {
    t: "",
  };
  try {
    const tokenFromStorage = getFromStore(ACCESS_TOKEN_KEY);
    token.t = tokenFromStorage?.t;
    return token;
  } catch (e) {
    return token;
  }
};

export const getActualResponseFromAxiosRequest = (data: AxiosError) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (data.request) {
    return data.request.response;
  }
  return data.request;
};

export function returnParsedJson(jsonObject: any) {
  try {
    const parsedJson = JSON.parse(jsonObject);
    return parsedJson;
  } catch (e) {
    return false;
  }
}

export const parseAPI = (
  template: string,
  templateParams: { [key: string]: string | number | boolean }
) => {
  let url = template;
  for (const key of Object.keys(templateParams)) {
    url = url.replace(`:${key}`, `${templateParams[key]}`);
  }
  return url;
};
