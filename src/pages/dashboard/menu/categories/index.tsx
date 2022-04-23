import { Category } from "@/services/types";
import category from "@/services/worker/admin/category";
import {
  fileToUrl,
  renderDate,
  tableCellFixed,
  tablePagination,
} from "@/utils";
import { download } from "@/utils/csv";
import useRequest from "@ahooksjs/use-request";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { ProFormInstance } from "@ant-design/pro-form";
import ProTable, { ActionType } from "@ant-design/pro-table";
import { Button, Image, message } from "antd";
import dayjs from "dayjs";
import React, { FC, useRef, useState } from "react";
import Create from "./create";
import Remove from "./remove";
import Update from "./update";

const Categories: FC = () => {
  const actionRef = useRef<ActionType>();
  const [update, setUpdate] = useState<Category>();
  const [remove, setRemove] = useState<Category>();
  const fetch = useRequest(category.list, {
    manual: true,
    onError: (err) => message.error(err.message),
  });
  const ref = useRef<ProFormInstance>();
  const reload = () => actionRef.current?.reload();

  return (
    <>
      <ProTable<Category>
        rowKey="id"
        id="main-table"
        scroll={{ x: "auto" }}
        actionRef={actionRef}
        headerTitle="Ангиллууд"
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
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Нэр",
            dataIndex: "name",
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Зураг",
            search: false,
            dataIndex: "image",
            render: (_value, record) => (
              <Image src={fileToUrl(record.image_path)} width={100} />
            ),
          },
          {
            ...tableCellFixed(100),
            ellipsis: true,
            title: "Идэвхитэй эсэх",
            dataIndex: "active",
            render: (_value, record) => (record.active ? "Тийм" : "Үгүй"),
            search: false,
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
              <Button
                ghost
                key="edit"
                size="small"
                type="primary"
                icon={<EditFilled />}
                onClick={() => setUpdate(record)}
              />,
              <Button
                ghost
                danger
                key="delete"
                size="small"
                type="primary"
                icon={<DeleteFilled />}
                onClick={() => setRemove(record)}
              />,
            ],
          },
        ]}
        request={async (params, sort) => {
          const result = await fetch.run({
            ...tablePagination(params, sort),
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
                "Категориуд",
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
    </>
  );
};

export default Categories;
