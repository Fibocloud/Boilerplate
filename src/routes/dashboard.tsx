import { useStore } from "@/contexts";
import DashboardLayout from "@/layouts/dashboard";
import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loader from "./components/loadable";
import { IRoute } from "./types";

const routes: IRoute[] = [
  {
    exact: true,
    key: "/dashboard/settings/branches",
    path: "/dashboard/settings/branches",
    component: Loader(import("@/pages/dashboard/settings/branches")),
  },
  {
    exact: true,
    key: "/dashboard/menu/categories",
    path: "/dashboard/menu/categories",
    component: Loader(import("@/pages/dashboard/menu/categories")),
  },
  {
    exact: true,
    key: "/dashboard/menu/products",
    path: "/dashboard/menu/products",
    component: Loader(import("@/pages/dashboard/menu/products")),
  },
  {
    exact: true,
    key: "/dashboard/menu/products_size",
    path: "/dashboard/menu/products_size",
    component: Loader(import("@/pages/dashboard/menu/products_size")),
  },
  {
    exact: true,
    key: "/dashboard/menu/tags",
    path: "/dashboard/menu/tags",
    component: Loader(import("@/pages/dashboard/menu/tags")),
  },
  {
    exact: true,
    key: "not_authorized",
    path: "/dashboard/403",
    component: Loader(import("@/pages/exceptions/NotAuthorized")),
  },
  {
    key: "not_found",
    component: Loader(import("@/pages/exceptions/NotFound")),
  },
];

const DashboardRoutes: FC = () => {
  const [{ authorized }] = useStore();
  return (
    <DashboardLayout>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            render={({ location }) =>
              authorized ? (
                <route.component />
              ) : (
                <Redirect
                  to={{
                    pathname: "/auth/login",
                    state: { from: location },
                  }}
                />
              )
            }
          />
        ))}
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
