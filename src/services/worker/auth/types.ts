import { Base } from "@/types";

export interface LoginData {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  user: Admin;
}

export interface Admin extends Base {
  email?: string;
}
