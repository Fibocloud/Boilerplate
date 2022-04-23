import { Branch } from "@/services/types";
import branch from "@/services/worker/admin/branch";
import { BranchInput } from "@/services/worker/admin/branch/types";
import { DrawerForm, ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { message } from "antd";
import React, { FC, useRef } from "react";

interface Props {
  data?: Branch;
  onFinish: () => void;
  onCancel: () => void;
}

const Update: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<BranchInput>>();
  const updateBranch = useRequest(branch.update, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  return (
    <DrawerForm<BranchInput>
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
        name="name"
        label="Нэр"
        placeholder=""
        rules={[{ required: true, message: "Нэр заавал хэрэгтэй" }]}
      />
    </DrawerForm>
  );
};

export default Update;
