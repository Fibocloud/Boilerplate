import category from "@/services/worker/admin/category";
import {
  Category,
  CategoryInput,
} from "@/services/worker/admin/category/types";
import file from "@/services/file";
import {
  DrawerForm,
  ProFormInstance,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { message } from "antd";
import React, { FC, useRef } from "react";
import { fileToUrl } from "@/utils";

interface Props {
  data?: Category;
  onFinish: () => void;
  onCancel: () => void;
}

const Update: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<CategoryInput>>();
  const updateBranch = useRequest(category.update, {
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
        image_path: data?.image_path,
        image: data?.image_path
          ? [
            {
              uid: 1,
              name: "name",
              status: "done",
              response: "",
              url: fileToUrl(data.image_path),
            },
          ]
          : [],
        is_default: data?.is_default,
        active: data?.active,
      }}
      onFinish={async (values) => {
        values.image_path = data?.image_path || "";
        if (values?.image[0].originFileObj) {
          const uploadedFile = await upload.run({
            file: values.image[0].originFileObj,
            bucket_name: "category-images",
            name: values.image[0].name,
          });
          values.image_path = uploadedFile.path;
        }

        if (data && (await updateBranch.run(data.id, values))) {
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
        rules={[{ required: true, message: "Нэр заавал хэрэгтэй" }]}
      />
      <ProFormSwitch name="active" label="Идэвхтэй эсэх" />
    </DrawerForm>
  );
};

export default Update;
