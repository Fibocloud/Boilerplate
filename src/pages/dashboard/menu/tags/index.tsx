import { Tag } from "@/services/types";
import tag from "@/services/worker/admin/product/tag";
import { renderDate, tableCellFixed, tablePagination } from "@/utils";
import { download } from "@/utils/csv";
import { renderBadge } from "@/utils/ui";
import useRequest from "@ahooksjs/use-request";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { ProFormInstance } from "@ant-design/pro-form";
import ProTable, { ActionType } from "@ant-design/pro-table";
import { Button, message, Tag as TagAnt } from "antd";
import dayjs from "dayjs";
import React, { FC, useRef, useState } from "react";
import Create from "./create";
import Remove from "./remove";
import Update from "./update";

const Categories: FC = () => {
  const actionRef = useRef<ActionType>();
  const [update, setUpdate] = useState<Tag>();
  const [remove, setRemove] = useState<Tag>();
  const ref = useRef<ProFormInstance>();
  const fetch = useRequest(tag.list, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  const reload = () => actionRef.current?.reload();

  return (
    <>
      <ProTable<Tag>
        rowKey="id"
        id="main-table"
        scroll={{ x: "auto" }}
        actionRef={actionRef}
        headerTitle="Таг"
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
            render: (_value, record) => (
              <TagAnt color={record.color}>{record.name}</TagAnt>
            ),
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
                "Тагнууд",
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
