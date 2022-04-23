import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router";
import styles from "./styles.module.less";

interface Props {
  url?: string;
}

const Logo: React.FC<Props> = ({ url }) => {
  const history = useHistory();

  return (
    <Button
      type="link"
      size="large"
      className={styles.container}
      onClick={() => {
        if (url) {
          history.push(url);
        }
      }}
    >
      <img
        src="/images/logo.png"
        alt="logo"
        style={{ height: "3rem", marginRight: "1rem" }}
      />
      <strong>Logo</strong>
    </Button>
  );
};

export default Logo;
