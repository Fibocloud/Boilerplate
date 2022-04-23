import { decryptWithAES, encryptWithAES } from "@/utils/parse";
import http from "../../index";
import { Admin, LoginData, LoginResponse } from "./types";

namespace auth {
  const userKey = "app.user";
  const tokenKey = "app.token";

  export const saveToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
  };

  export const rememberUser = (values: LoginData) => {
    if (values.remember) {
      localStorage.setItem(userKey, encryptWithAES(JSON.stringify(values)));
    } else {
      localStorage.removeItem(userKey);
    }
  };

  export const getRememberUser = () => {
    const userData = localStorage.getItem(userKey);
    if (userData) {
      const _userData = JSON.parse(decryptWithAES(userData)) as LoginData;
      return _userData;
    }
    return undefined;
  };

  export const remToken = () => {
    localStorage.removeItem(tokenKey);
  };

  export const hasToken = () => !!localStorage.getItem(tokenKey);

  export const getToken = () => localStorage.getItem(tokenKey);

  export const info = () => http.get<Admin>("/xxx/info", { hasAuth: true });

  export const login = (body: LoginData) =>
    http.post<LoginResponse>("/xxx/login", {
      body,
    });
}

export default auth;
