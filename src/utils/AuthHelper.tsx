import {
  SELECTED_ENTITY_LOCAL_STORAGE_KEY,
  ACCESS_TOKEN_KEY,
} from "./constant";
import REGEX from "./Regex";

export const getLastSelectedEntity = (): string => {
  const data = window.localStorage.getItem(SELECTED_ENTITY_LOCAL_STORAGE_KEY);
  if (data) {
    return atob(data);
  }
  return data;
};

export const setBrowserSession = (token: string) => {
  const tokenObject: unknown = {
    t: token,
  };

  setToStore(ACCESS_TOKEN_KEY, tokenObject);
};

export const setToStore = (key: string, obj = {}) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

export const appendHTTP = (url: string) => {
  let newURL = "";
  if (url && !REGEX.URL.test(url)) {
    newURL += "http://";
  }
  newURL += url;
  return newURL;
};

export const parseToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
