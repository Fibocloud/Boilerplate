import auth from "@/services/worker/auth";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { message } from "antd";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Action, DataType, ReducerType, Refrences, Type } from "./types";

const defaultRefrence: Refrences = {
  loading: true,
  branches: [],
};

const defaultData: DataType = {
  authorized: false,
  settings: {
    layout: "side",
    navTheme: "dark",
    colorWeak: false,
    title: "Boiler plate",
    fixedHeader: true,
    fixSiderbar: true,
    contentWidth: "Fluid",
  },
  refrences: { ...defaultRefrence },
};

const reducer: ReducerType = (state, action) => {
  switch (action[0]) {
    case Action.SET_SETTINGS:
      return { ...state, settings: action[1] };
    case Action.SIGN_IN:
      return { ...state, auth: action[1], authorized: true };
    case Action.SET_REFRENCES:
      return { ...state, refrences: action[1] };
    case Action.SIGN_OUT:
      auth.remToken();
      return { ...state, auth: undefined, authorized: false };
    default:
      return state;
  }
};

const UserContext = createContext<Type>([
  defaultData,
  () => {
    // do nothing.
  },
  {
    info: () => {},
  },
]);

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
  const [redux, setRedux] = useReducer(reducer, defaultData);
  const _info = useRequest(auth.info, {
    manual: true,
    onSuccess: (data) => setRedux([Action.SIGN_IN, data]),
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    if (auth.hasToken()) {
      _info.run();
    }
  }, []);

  return (
    <UserContext.Provider value={[redux, setRedux, { info: _info.refresh }]}>
      {_info.loading ? <PageLoading /> : children}
    </UserContext.Provider>
  );
};

export const useStore: () => Type = () => useContext<Type>(UserContext);
