import productSize from "@/services/worker/admin/product/size";
import { ProductSize } from "@/services/worker/admin/product/size/types";
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
import React, { FC, useRef, useState } from "react";
import Create from "./create";
import Remove from "./remove";
import Update from "./update";

const Categories: FC = () => {
  const actionRef = useRef<ActionType>();
  const [update, setUpdate] = useState<ProductSize>();
  const [remove, setRemove] = useState<ProductSize>();
  const ref = useRef<ProFormInstance>();
  const fetch = useRequest(productSize.list, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  const reload = () => actionRef.current?.reload();

  return (
    <>
      <ProTable<ProductSize>
        rowKey="id"
        id="main-table"
        scroll={{ x: "auto" }}
        actionRef={actionRef}
        headerTitle="Бүтээгдэхүүний хэмжээ"
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
            title: "Хэмжих нэгж",
            dataIndex: "unit",
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Утга",
            dataIndex: "value",
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            search: false,
            title: "Зураг",
            dataIndex: "file",
            render: (_value, record) => (
              <Image src={fileToUrl(record.file_path)} width={60} />
            ),
          },
          {
            ...tableCellFixed(200),
            ellipsis: true,
            title: "Тайлбар",
            dataIndex: "description",
          },
          {
            ...tableCellFixed(160),
            title: "Бүртгүүлсэн огноо",
            key: "created_at",
            defaultSortOrder: "descend",
            dataIndex: "created_at",
            valueType: "dateRange",
            sorter: true,
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
                "Бүтээгдэхүүний хэмжээ",
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
