import { Profile } from "@/components";
import React, { FC } from "react";
import styles from "./styles.module.less";

const Header: FC = () => {
  return (
    <div className={styles.container}>
      <Profile />
    </div>
  );
};

export default Header;
