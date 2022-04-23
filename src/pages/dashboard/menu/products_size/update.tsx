import file from "@/services/file";
import productSize from "@/services/worker/admin/product/size";
import {
  ProductSize,
  ProductSizeInput,
} from "@/services/worker/admin/product/size/types";
import { fileToUrl } from "@/utils";
import {
  DrawerForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { message } from "antd";
import React, { FC, useRef } from "react";

interface Props {
  data?: ProductSize;
  onFinish: () => void;
  onCancel: () => void;
}

const Update: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<ProductSizeInput>>();
  const updateBranch = useRequest(productSize.update, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  return (
    <DrawerForm<ProductSizeInput>
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
        unit: data?.unit,
        value: data?.value,
        desc: data?.description,
        file_path: data?.file_path,
        file: !!data?.file_path
          ? [
              {
                uid: 1,
                name: "name",
                status: "done",
                response: "",
                url: fileToUrl(data.file_path),
              },
            ]
          : [],
      }}
      onFinish={async (values) => {
        values.file_path = data?.file_path || "";
        if (values?.file[0]?.originFileObj) {
          const uploadedFile = await upload.run({
            file: values.file[0].originFileObj,
            bucket_name: "product-images",
            name: values.file[0].name,
          });
          values.file_path = uploadedFile.path;
        }

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
        placeholder="Нэр"
        rules={[{ required: true, message: "Нэр оруулна уу" }]}
      />
      <ProFormText
        name="unit"
        label="Хэмжих нэгж"
        placeholder="Хэмжих нэгж"
        rules={[{ required: true, message: "Хэмжих нэгж оруулна уу" }]}
      />
      <ProFormText name="value" label="Утга" placeholder="Утга" />

      <ProFormUploadButton
        required
        max={1}
        label="Зураг"
        name="file"
        title="Зураг"
        accept="image/*"
        fieldProps={{
          listType: "picture-card",
          beforeUpload: () => false,
        }}
      />

      <ProFormTextArea name="desc" label="Тайлбар" placeholder="Тайлбар" />
    </DrawerForm>
  );
};

export default Update;
