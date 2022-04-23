import { useStore } from "@/contexts";
import { Action } from "@/contexts/types";
import { LockOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
import styles from "./styles.module.less";

const Profile: FC = () => {
  const history = useHistory();
  const [{ auth }, setAuth] = useStore();
  const { email } = auth || { email: "" };

  const logout = () => {
    setAuth([Action.SIGN_OUT]);
    history.replace("/");
  };

  const color = "#146135";
  const avatar = email?.substring(0, 2) || "AU";

  const menu = (
    <Menu selectable={false}>
      <Menu.Item
        key="avatar"
        onClick={() => {
          // history.push("/dashboard/customer/customers");
        }}
      >
        <div className={styles.profile}>
          <Avatar
            shape="square"
            className={styles.noSelect}
            style={{ backgroundColor: color }}
            size={40}
          >
            {avatar.toUpperCase()}
          </Avatar>
          <div className={styles.nameContainer}>
            <div className={styles.name}>{email}</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item danger key="logout" onClick={logout}>
        <LockOutlined /> Гарах
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      overlayClassName={styles.dropdown}
      trigger={["click"]}
      {...({
        children: (
          <div className={styles.profile}>
            <Avatar
              shape="square"
              className={styles.noSelect}
              style={{ backgroundColor: color }}
            >
              {avatar.toUpperCase()}
            </Avatar>
          </div>
        ),
      } as any)}
    />
  );
};

export default Profile;
