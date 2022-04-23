import { StoreProvider } from "@/contexts";
import Routes from "@/routes";
import NavigationScroll from "@/routes/components/navigation-scroll";
import { ConfigProvider } from "antd";
import enUSIntl from "antd/lib/locale/en_US";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./global.less";

ReactDOM.render(
  <ConfigProvider locale={enUSIntl}>
    <BrowserRouter>
      <StoreProvider>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </StoreProvider>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("root")
);
