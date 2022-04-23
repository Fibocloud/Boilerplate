import category from "@/services/worker/admin/category";
import { CategoryInput } from "@/services/worker/admin/category/types";
import file from "@/services/file";
import {
  DrawerForm,
  ProFormSwitch,
  ProFormText,
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
  const create = useRequest(category.create, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  return (
    <DrawerForm<CategoryInput>
      title="Ангилал үүсгэх"
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
        if (values.image) {
          const uploadedFile = await upload.run({
            bucket_name: "category-images",
            file: values.image[0].originFileObj,
            name: values.image[0].name,
          });
          values.image_path = uploadedFile.path;
        }

        if (await create.run(values)) {
          onFinish();
          return true;
        }
        return false;
      }}
    >
      <ProFormUploadButton
        required
        max={1}
        label="Зураг"
        name="image"
        title="Зураг"
        accept="image/*"
        fieldProps={{
          listType: "picture-card",
          beforeUpload: () => false,
        }}
        rules={[{ required: true, message: "Та заавал зураг оруулна уу" }]}
      />

      <ProFormText
        name="name"
        label="Нэр"
        placeholder=""
        rules={[{ required: true, message: "Нэр оруулна уу" }]}
      />
      <ProFormSwitch name="active" label="Идэвхтэй эсэх" />
    </DrawerForm>
  );
};

export default Create;
