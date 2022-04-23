import tag from "@/services/worker/admin/product/tag";
import { TagInput } from "@/services/worker/admin/product/tag/types";
import { DrawerForm, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import React, { FC, useRef } from "react";

interface Props {
  onFinish: () => void;
}

const Create: FC<Props> = ({ onFinish }) => {
  const formRef = useRef();
  const create = useRequest(tag.create, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  return (
    <DrawerForm<TagInput>
      title="Таг үүсгэх"
      width={300}
      formRef={formRef}
      trigger={
        <Button type="primary" key="primary">
          Үүсгэх
        </Button>
      }
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        headerStyle: { borderBottom: 0 },
        footerStyle: { borderTop: 0 },
      }}
      submitter={{
        searchConfig: {
          resetText: "Буцах",
          submitText: "Хадгалах",
        },
      }}
      onFinish={async (values) => {
        if (await create.run(values)) {
          onFinish();
          return true;
        }
        return false;
      }}
    >
      <ProFormText
        name="color"
        label="Өнгө"
        placeholder=""
        rules={[{ required: true, message: "Өнгө оруулна уу" }]}
      />

      <ProFormText
        name="name"
        label="Нэр"
        placeholder=""
        rules={[{ required: true, message: "Нэр оруулна уу" }]}
      />
    </DrawerForm>
  );
};

export default Create;
