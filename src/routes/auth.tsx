import { useStore } from "@/contexts";
import AuthLayout from "@/layouts/auth";
import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loader from "./components/loadable";
import { IRoute } from "./types";

const routes: IRoute[] = [
  {
    exact: true,
    key: "login",
    path: "/auth/login",
    component: Loader(import("@/pages/auth/login"))
  },
  {
    exact: true,
    path: "/auth/403",
    key: "not_authorized",
    component: Loader(import("@/pages/exceptions/NotAuthorized"))
  },
  {
    key: "not_found",
    component: Loader(import("@/pages/exceptions/NotFound"))
  }
];

const AuthRoutes: FC = () => {
  const [{ authorized }] = useStore();
  return (
    <AuthLayout>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            render={({ location }) =>
              authorized ? (
                <Redirect
                  to={{
                    pathname: "/dashboard/order/product",
                    state: { from: location }
                  }}
                />
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Switch>
    </AuthLayout>
  );
};

export default AuthRoutes;
