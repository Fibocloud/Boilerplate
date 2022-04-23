import { Tag } from "@/services/types";
import tag from "@/services/worker/admin/product/tag";
import { TagInput } from "@/services/worker/admin/product/tag/types";
import { DrawerForm, ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { message } from "antd";
import React, { FC, useRef } from "react";

interface Props {
  data?: Tag;
  onFinish: () => void;
  onCancel: () => void;
}

const Update: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<TagInput>>();
  const updateBranch = useRequest(tag.update, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  return (
    <DrawerForm<TagInput>
      title={`Засах (${data?.name})`}
      width={300}
      visible={!!data}
      formRef={formRef}
      drawerProps={{
        onClose: onCancel,
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
      initialValues={{
        color: data?.color,
        name: data?.name,
      }}
      onFinish={async (values) => {
        if (data && (await updateBranch.run(data.id, values))) {
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

export default Update;
