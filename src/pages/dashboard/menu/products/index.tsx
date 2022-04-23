import { StatusTag } from "@/components";
import publicProduct from "@/services/public/product";
import publicRefrence from "@/services/public/reference";
import { Product } from "@/services/types";
import product from "@/services/worker/admin/product";
import {
  fileToUrl,
  moneyFormat,
  renderDate,
  tableCellFixed,
  tablePagination,
} from "@/utils";
import { download } from "@/utils/csv";
import { renderBadge } from "@/utils/ui";
import useRequest from "@ahooksjs/use-request";
import {
  ApartmentOutlined,
  DeleteFilled,
  EditFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { ProFormInstance, ProFormSelect } from "@ant-design/pro-form";
import ProTable, { ActionType } from "@ant-design/pro-table";
import { Button, Image, message, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { FC, useRef, useState } from "react";
import Create from "./create";
import Detail from "./detail";
import Extra from "./extra";
import Remove from "./remove";
import Update from "./update";

const Products: FC = () => {
  const actionRef = useRef<ActionType>();
  const [detail, setDetail] = useState<Product>();
  const [update, setUpdate] = useState<Product>();
  const [remove, setRemove] = useState<Product>();
  const [extra, setExtra] = useState<Product>();
  const fetch = useRequest(product.list, {
    manual: true,
    onError: (err) => message.error(err.message),
  });
  const ref = useRef<ProFormInstance>();
  const tagAction = useRequest(publicRefrence.tagListNp, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
    },
  });
  const categoryAction = useRequest(publicProduct.categoryListNp, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
    },
  });
  const reload = () => actionRef.current?.reload();

  return (
    <>
      <ProTable<Product>
        id="main-table"
        rowKey={(record) => record.id}
        scroll={{ x: "auto" }}
        actionRef={actionRef}
        headerTitle="Бүтээгдэхүүн"
        search={{
          filterType: "light",
          labelWidth: "auto",
        }}
        formRef={ref}
        columns={[
          {
            title: "№",
            width: 48,
            fixed: "left",
            dataIndex: "index",
            valueType: "index",
            key: "index",
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Нэр",
            dataIndex: "name",
            key: "name",
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Ангилал",
            dataIndex: "category",
            key: "category",
            render: (_value, record) => record.category?.name,
            valueType: "select",
            renderFormItem: () => {
              return (
                <ProFormSelect
                  name="tag"
                  proFieldProps={{
                    light: true,
                  }}
                  mode="multiple"
                  placeholder="Ангилалууд"
                  request={async () => {
                    let res = await categoryAction.run();
                    return res.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }));
                  }}
                />
              );
            },
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            search: false,
            title: "Зураг",
            dataIndex: "cover",
            render: (_value, record) =>
              record.cover_path ? (
                <Image src={fileToUrl(record.cover_path)} width={100} />
              ) : (
                "-"
              ),
          },
          {
            ...tableCellFixed(75),
            ellipsis: true,
            title: "Үндсэн үнэ",
            dataIndex: "default_price",
            key: "default_price",
            render: (_value, record) => moneyFormat(record.default_price) + "₮",
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Таг",
            key: "tags",
            dataIndex: "tag",
            valueType: "select",
            renderFormItem: () => {
              return (
                <ProFormSelect
                  name="tag"
                  proFieldProps={{
                    light: true,
                  }}
                  mode="multiple"
                  placeholder="Тагууд"
                  request={async () => {
                    let res = await tagAction.run();
                    return res.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }));
                  }}
                />
              );
            },
            render: (_value, record) =>
              record.tags?.map((tag) => {
                return (
                  <Tag key={tag.id} color={tag.color}>
                    {tag.name}
                  </Tag>
                );
              }),
          },
          {
            ...tableCellFixed(75),
            ellipsis: true,
            title: "Идэхтэй эсэх",
            key: "active",
            dataIndex: "active",
            render: (_value, record) => <StatusTag status={record.active} />,
          },
          {
            ...tableCellFixed(160),
            title: "Бүртгүүлсэн огноо",
            key: "created_at",
            defaultSortOrder: "descend",
            dataIndex: "created_at",
            valueType: "dateRange",
            sorter: (a, b) => dayjs(a.created_at).diff(dayjs(b.created_at)),
            render: (_, record) => renderDate(record.created_at),
          },
          {
            title: "#",
            width: 180,
            key: "option",
            fixed: "right",
            valueType: "option",
            render: (_, record) => [
              <Tooltip title="Дэлгэрэнгүй">
                <Button
                  ghost
                  key="show"
                  size="small"
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => setDetail(record)}
                />
              </Tooltip>,
              <Tooltip title="Засах">
                <Button
                  ghost
                  key="edit"
                  size="small"
                  type="primary"
                  icon={<EditFilled />}
                  onClick={() => setUpdate(record)}
                />
              </Tooltip>,
              <Tooltip title="Нэмэлт орц">
                <Button
                  ghost
                  key="extra"
                  size="small"
                  type="primary"
                  icon={<ApartmentOutlined />}
                  onClick={() => setExtra(record)}
                />
              </Tooltip>,
              <Tooltip title="Устгах">
                <Button
                  ghost
                  danger
                  key="delete"
                  size="small"
                  type="primary"
                  icon={<DeleteFilled />}
                  onClick={() => setRemove(record)}
                />
              </Tooltip>,
            ],
          },
        ]}
        request={async (params, sorter) => {
          const result = await fetch.run({
            ...tablePagination(params, sorter),
          });
          return {
            data: result.items,
            total: result.total,
            success: true,
          };
        }}
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={(e) => {
              download(
                "Бүтээгдэхүүн",
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          >
            Excel
          </Button>,
          <Create onFinish={reload} />,
        ]}
      />
      <Update
        data={update}
        onFinish={() => {
          setUpdate(undefined);
          reload();
        }}
        onCancel={() => {
          setUpdate(undefined);
        }}
      />
      <Extra
        data={extra}
        onFinish={() => {
          setExtra(undefined);
          reload();
        }}
        onCancel={() => {
          setExtra(undefined);
        }}
      />
      <Remove
        data={remove}
        onFinish={() => {
          setRemove(undefined);
          reload();
        }}
        onCancel={() => {
          setRemove(undefined);
        }}
      />
      <Detail
        data={detail}
        onCancel={() => {
          setDetail(undefined);
        }}
      />
    </>
  );
};

export default Products;
