import React, { FC } from "react";
import { withRouter } from "react-router";
import styles from "./styles.module.less";

const AuthLayout: FC<any> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default withRouter(AuthLayout);
