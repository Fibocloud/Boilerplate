import { Category, Product, Tag } from "@/services/types";
import file from "@/services/file";
import product from "@/services/worker/admin/product";
import { ProductInput } from "@/services/worker/admin/product/types";
import { ProductSize } from "@/services/types";
import ProForm, {
  DrawerForm,
  ProFormDigit,
  ProFormInstance,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, Divider, message, Row } from "antd";
import React, { FC, useEffect, useRef } from "react";
import publicProduct from "@/services/public/product";
import publicReference from "@/services/public/reference";
import { fileToUrl } from "@/utils";

interface Props {
  data?: Product;
  onFinish: () => void;
  onCancel: () => void;
}

const Update: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<ProductInput>>();
  const updateProduct = useRequest(product.update, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  const categoryAction = useRequest(publicProduct.categoryListNp, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
    },
  });

  const tagAction = useRequest(publicReference.tagListNp, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
    },
  });

  const sizeAction = useRequest(publicReference.sizeListNp, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
    },
  });

  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    if (data) {
      categoryAction.run();
      tagAction.run();
      sizeAction.run();
    }
  }, [data]);

  return (
    <DrawerForm<ProductInput>
      title={`Засах (${data?.name})`}
      width={600}
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
        active: data?.active,
        image: [
          {
            uid: 1,
            name: "name",
            status: "done",
            response: "",
            url: fileToUrl(data?.cover_path || ""),
          },
        ],
        category_id: data?.category?.id,
        tags: data?.tags?.reduce<number[]>((acc, record) => {
          acc.push(record.id);
          return acc;
        }, []),
        prices:
          data?.prices?.map((item) => {
            return {
              ...item,
              size_id: item.size?.id,
            };
          }) || [],
        description: data?.description,
        ingredient: data?.ingredient,
      }}
      onFinish={async (values) => {
        values.cover_path = data?.cover_path || "";
        if (values?.image[0].originFileObj) {
          const uploadedFile = await upload.run({
            file: values.image[0].originFileObj,
            bucket_name: "product-images",
            name: values.image[0].name,
          });
          values.cover_path = uploadedFile.path;
        }

        if (data) {
          if (await updateProduct.run(data?.id, values)) {
            onFinish();
            return true;
          }
        }
        return false;
      }}
    >
      <ProFormSelect
        showSearch
        name="category_id"
        label="Ангилал"
        allowClear
        rules={[{ required: true, message: "Ангилал оруулна уу" }]}
        placeholder="Ангилал"
        fieldProps={{
          dropdownRender: (dom) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "content",
              }}
            >
              {dom}
            </div>
          ),
          loading: categoryAction.loading,
        }}
        options={categoryAction?.data?.map((item: Category) => ({
          label: item.name,
          value: item.id,
        }))}
      />

      <ProFormUploadButton
        required
        max={1}
        label="Зураг"
        name="image"
        rules={[{ required: true, message: "Зураг оруулна уу" }]}
        title="Зураг"
        accept="image/*"
        fieldProps={{
          listType: "picture-card",
          beforeUpload: () => false,
        }}
      />

      <Row gutter={10}>
        <Col xs={12} sm={12} md={12}>
          <ProFormText
            name="name"
            label="Нэр"
            placeholder="Нэр"
            rules={[{ required: true, message: "Нэр оруулна уу" }]}
          />
        </Col>
        <Col xs={12} sm={12} md={12}>
          <ProFormText
            name="ingredient"
            label="Орц, найрлага"
            placeholder="Орц, найрлага"
            rules={[{ required: true, message: "Орц оруулна уу" }]}
          />
        </Col>
      </Row>

      <ProFormTextArea
        name="description"
        label="Тайлбар"
        placeholder="Тайлбар"
      />

      <ProFormSelect
        showSearch
        name="tags"
        label="Таг"
        mode="multiple"
        allowClear
        placeholder="Таг"
        fieldProps={{
          dropdownRender: (dom) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "content",
              }}
            >
              {dom}
            </div>
          ),
          loading: tagAction.loading,
        }}
        options={tagAction?.data?.map((item: Tag) => ({
          label: item.name,
          value: item.id,
        }))}
      />

      <Divider>Бүтээгдэхүүний үнэ</Divider>

      <ProFormList
        name={["prices"]}
        itemContainerRender={(doms) => {
          return <ProForm.Group>{doms}</ProForm.Group>;
        }}
        creatorButtonProps={{
          creatorButtonText: "Шинэ үнэ нэмэх",
        }}
        copyIconProps={false}
      >
        {(f, index, action) => {
          return (
            <Row gutter={10} key={index}>
              <Col span={8}>
                <ProFormSelect
                  width="md"
                  showSearch
                  name="size_id"
                  label="Хэмжээ"
                  allowClear
                  placeholder="Хэмжээ"
                  rules={[{ required: true, message: "Хэмжээ оруулна уу" }]}
                  fieldProps={{
                    dropdownRender: (dom) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "content",
                        }}
                      >
                        {dom}
                      </div>
                    ),
                    loading: sizeAction.loading,
                  }}
                  options={sizeAction?.data?.map((item: ProductSize) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Col>
              <Col span={7}>
                <ProFormMoney
                  customSymbol="₮"
                  placeholder="Үнэ"
                  label="Үнэ"
                  name="total_price"
                  fieldProps={{
                    onChange: (value) => {
                      if (typeof value === "number") {
                        formRef.current?.setFields([
                          {
                            name: ["prices", index, "xp"],
                            value: Math.round(value / 1000),
                          },
                        ]);
                      }
                    },
                  }}
                  min={1}
                  rules={[{ required: true, message: "Үнэ оруулна уу" }]}
                />
              </Col>
              <Col span={5}>
                <ProFormDigit name="xp" label="XP" disabled />
              </Col>
              <Col span={4}>
                <ProFormSwitch name="is_default" label="Суурь үнэ" />
              </Col>
            </Row>
          );
        }}
      </ProFormList>
      <ProFormSwitch name="active" label="Идэвхтэй эсэх" />
    </DrawerForm>
  );
};

export default Update;
