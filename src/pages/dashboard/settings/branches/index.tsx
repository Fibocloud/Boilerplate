import { Branch } from "@/services/types";
import branch from "@/services/worker/admin/branch";
import { renderDate, tableCellFixed, tablePagination } from "@/utils";
import { download } from "@/utils/csv";
import { renderBadge } from "@/utils/ui";
import useRequest from "@ahooksjs/use-request";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { ProFormInstance } from "@ant-design/pro-form";
import ProTable, { ActionType } from "@ant-design/pro-table";
import { Button, message } from "antd";
import dayjs from "dayjs";
import React, { FC, useRef, useState } from "react";
import Create from "./create";
import Remove from "./remove";
import Update from "./update";

const Currencies: FC = () => {
  const actionRef = useRef<ActionType>();
  const [update, setUpdate] = useState<Branch>();
  const [remove, setRemove] = useState<Branch>();
  const fetch = useRequest(branch.list, {
    manual: true,
    onError: (err) => message.error(err.message),
  });
  const ref = useRef<ProFormInstance>();
  const reload = () => actionRef.current?.reload();
  return (
    <>
      <ProTable<Branch>
        rowKey="id"
        id="main-table"
        scroll={{ x: "auto" }}
        actionRef={actionRef}
        headerTitle="Салбарууд"
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
                "Салбарууд",
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

export default Currencies;
