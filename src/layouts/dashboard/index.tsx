import { useStore } from "@/contexts";
import { Action } from "@/contexts/types";
import ProLayout, { SettingDrawer } from "@ant-design/pro-layout";
import React, { FC, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { menuData, menuItemRender } from "./menu";

const DashboardLayout: FC<any> = ({ children, ...props }) => {
  const [{ settings }, setStore] = useStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div id="pro-layout">
      <ProLayout
        logo={
          settings?.navTheme === "dark"
            ? "/images/logo.png"
            : "/images/logo-dark.png"
        }
        disableMobile={false}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onMenuHeaderClick={() => props.history.push("/")}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        menuDataRender={() => menuData}
        menuItemRender={menuItemRender}
        rightContentRender={() => <Header />}
        footerRender={() => <Footer />}
        contentStyle={{
          margin: 0,
          overflowY: "auto",
          background: "#e8e8e8",
          padding: "1.628rem",
          height: "calc(100vh - 3rem)",
        }}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
      <SettingDrawer
        hideColors
        hideHintAlert
        hideCopyButton
        disableUrlParams
        settings={settings}
        pathname={props.location.pathname}
        getContainer={() => document.getElementById("pro-layout")}
        onSettingChange={(data) => {
          setStore([Action.SET_SETTINGS, data]);
        }}
      />
    </div>
  );
};

export default withRouter(DashboardLayout);
