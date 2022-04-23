import file from "@/services/file";
import productSize from "@/services/worker/admin/product/size";
import {
  ProductSize,
  ProductSizeInput,
} from "@/services/worker/admin/product/size/types";

import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import React, { FC, useRef } from "react";

interface Props {
  onFinish: () => void;
}

const Create: FC<Props> = ({ onFinish }) => {
  const formRef = useRef();
  const create = useRequest(productSize.create, {
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
      title="Бүтээгдэхүүн үүсгэх"
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
        if (values.file) {
          const uploadedFile = await upload.run({
            file: values.file[0].originFileObj,
            bucket_name: "product-images",
            name: values.file[0].name,
          });
          values.file_path = uploadedFile.path;
        }

        if (await create.run(values)) {
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

export default Create;
