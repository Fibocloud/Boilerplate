import { Branch } from "@/services/types";
import { Admin } from "@/services/worker/auth/types";
import { ProSettings } from "@ant-design/pro-layout";

export interface DataType {
  authorized: boolean;
  auth?: Admin;
  settings?: Partial<ProSettings>;
  refrences: Refrences;
}

export enum Action {
  SIGN_OUT = "SIGN_OUT",
  SIGN_IN = "SIGN_IN",
  SET_SETTINGS = "SET_SETTINGS",
  SET_REFRENCES = "SET_REFRENCES",
}

export type ReducerType = (state: DataType, action: Actions) => DataType;

export type Actions =
  | [Action.SIGN_OUT]
  | [Action.SIGN_IN, Admin]
  | [Action.SET_SETTINGS, Partial<ProSettings>]
  | [Action.SET_REFRENCES, Refrences];

export type Refreshs = {
  info: () => void;
};
export type Type = [DataType, (action: Actions) => void, Refreshs];

export interface Refrences {
  loading: boolean;
  branches: Branch[] | null;
}

export interface CabinClass {
  name: string;
  value: string;
}

export interface PassengerType {
  name: string;
  value: string;
}
