import React, { FC } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Loader from "./components/loadable";
import { IRoute } from "./types";

const routes: IRoute[] = [
  {
    path: "/auth",
    key: "auth",
    component: Loader(import("@/routes/auth")),
  },
  {
    path: "/dashboard",
    key: "dashboard",
    component: Loader(import("@/routes/dashboard")),
  },
  {
    exact: true,
    path: "/403",
    key: "not_authorized",
    component: Loader(import("@/pages/exceptions/NotAuthorized")),
  },
  {
    key: "not_found",
    component: Loader(import("@/pages/exceptions/NotFound")),
  },
];

const Routes: FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Switch location={location}>
          <Route
            exact
            key="root"
            path="/"
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: "/auth/login",
                  state: { from: location },
                }}
              />
            )}
          />
          {routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
