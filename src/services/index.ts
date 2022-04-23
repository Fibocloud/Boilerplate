import { BaseResponse } from "@/types";
import axios, { AxiosRequestConfig, CancelToken } from "axios";
import auth from "./worker/auth";

const baseURL = import.meta.env.VITE_API_URL;

export interface IParams {
  [key: string]: string;
}

export interface IHeader {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IOption {
  body?: IBody;
  hasAuth?: boolean;
  headers?: IHeader;
  params?: IParams;
  cancelToken?: CancelToken;
}

namespace http {
  export const getAuth = (hasAuth = false) =>
    hasAuth && auth.getToken()
      ? {
          Authorization: `Bearer ${auth.getToken()}`
        }
      : {};

  export const genHeader = (hasAuth = false, headers = {}) =>
    Object.assign(headers, getAuth(hasAuth));

  export const handleError = (err: any, reject: any) => {
    if (err && err.response && err.response.data) {
      return reject(err.response.data);
    }

    return reject({ message: "Unhandled error" });
  };

  export const request = async <T,>(options: AxiosRequestConfig) => {
    return new Promise<BaseResponse<T>>((resolve, reject) => {
      axios
        .request<BaseResponse<T>>({
          baseURL,
          ...options
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => handleError(err, reject));
    });
  };

  export const get = async <T,>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "GET",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      params: options?.params,
      cancelToken: options?.cancelToken
    }).then((data) => data.body);
  };

  export const post = async <T,>(
    url: string,
    options?: IOption
  ): Promise<T> => {
    return await request<T>({
      method: "POST",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      data: options?.body,
      cancelToken: options?.cancelToken
    }).then((data) => data.body);
  };

  export const put = async <T,>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "PUT",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      data: options?.body,
      cancelToken: options?.cancelToken
    }).then((data) => data.body);
  };

  export const del = async <T,>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "DELETE",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      data: options?.body,
      cancelToken: options?.cancelToken
    }).then((data) => data.body);
  };

  export const cancelToken = axios.CancelToken.source();
}

export default http;
