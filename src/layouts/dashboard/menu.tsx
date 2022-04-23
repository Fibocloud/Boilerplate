import {
  AppstoreOutlined,
  BankOutlined,
  HeartOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { MenuDataItem } from "@ant-design/pro-layout";
import { BaseMenuProps } from "@ant-design/pro-layout/lib/components/SiderMenu/BaseMenu";
import { WithFalse } from "@ant-design/pro-layout/lib/typings";
import React from "react";
import { Link } from "react-router-dom";

export const menuItemRender: WithFalse<
  (
    item: MenuDataItem & {
      isUrl: boolean;
      onClick: () => void;
    },
    defaultDom: React.ReactNode,
    menuProps: BaseMenuProps
  ) => React.ReactNode
> = (menuItemProps, defaultDom) => {
  return menuItemProps.isUrl ? (
    defaultDom
  ) : (
    <Link to={menuItemProps.path || "/"}>{defaultDom}</Link>
  );
};

const fontSize = 16;

export const menuData: MenuDataItem[] = [
  {
    key: "/dashboard/menu",
    name: "Цэс",
    icon: <HeartOutlined style={{ fontSize }} />,
    routes: [
      {
        key: "/dashboard/menu/production",
        name: "Бүтээгдэхүүн",
        icon: <HeartOutlined style={{ fontSize }} />,
        path: "/dashboard/menu/products",
      },
      {
        key: "/dashboard/menu/products_size",
        name: "Бүтээгдэхүүн хэмжээ",
        icon: <HeartOutlined style={{ fontSize }} />,
        path: "/dashboard/menu/products_size",
      },
      {
        key: "/dashboard/menu/categories",
        name: "Ангилал",
        icon: <AppstoreOutlined style={{ fontSize }} />,
        path: "/dashboard/menu/categories",
      },
      {
        key: "/dashboard/menu/tags",
        name: "Таг",
        icon: <TagOutlined style={{ fontSize }} />,
        path: "/dashboard/menu/tags",
      },
    ],
  },
  {
    key: "/dashboard/settings",
    name: "Тохиргоо",
    icon: <SettingOutlined style={{ fontSize }} />,
    routes: [
      {
        key: "/dashboard/settings/branches",
        name: "Салбар",
        icon: <BankOutlined style={{ fontSize }} />,
        path: "/dashboard/settings/branches",
      },
    ],
  },
];
