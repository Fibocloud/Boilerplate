import product from "@/services/worker/admin/product";
import { ProductInput } from "@/services/worker/admin/product/types";
import ProForm, {
  DrawerForm,
  ProFormInstance,
  ProFormList,
  ProFormMoney,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, message, Row, Spin } from "antd";
import React, { FC, useEffect, useRef } from "react";
import { Product } from "@/services/types";
import productExtra from "../../../../services/worker/admin/product/extra/index";
import { ExtraAddInput } from "@/services/worker/admin/product/extra/types";

interface Props {
  data?: Product;
  onFinish: () => void;
  onCancel: () => void;
}

const Extra: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<ExtraAddInput>>();
  const extraProduct = useRequest(productExtra.add, {
    manual: true,
    onSuccess: () => message.success("Амжилттай хадгаллаа"),
    onError: (err) => message.error(err.message),
  });

  const { run } = useRequest(product.get, {
    manual: true,
    onSuccess: (res) => {
      formRef.current?.setFieldsValue({ extras: res.extras || [] });
    },
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    if (data?.id) {
      run(data.id);
    }
  }, [data]);

  return (
    <DrawerForm<ExtraAddInput>
      title={`Бүтээгдэхүүний нэмэлт орц оруулах/засах (${data?.name})`}
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
      onFinish={async (values) => {
        if (data) {
          if (await extraProduct.run(data.id, values)) {
            onFinish();
            return true;
          }
        }
        return false;
      }}
    >
      <ProFormList
        name={["extras"]}
        itemContainerRender={(doms) => {
          return <ProForm.Group>{doms}</ProForm.Group>;
        }}
        creatorButtonProps={{
          creatorButtonText: "Шинэ орц оруулах",
        }}
        copyIconProps={false}
      >
        {(_f, index, _action) => {
          return (
            <Row gutter={10} key={index}>
              <Col span={10}>
                <ProFormText
                  width="md"
                  name="name"
                  label="Нэр"
                  placeholder=""
                  rules={[{ required: true, message: "Нэр оруулна уу" }]}
                />
              </Col>
              <Col span={14}>
                <ProFormMoney
                  customSymbol="₮"
                  placeholder="Үнэ"
                  label="Үнэ"
                  name="price"
                  min={1}
                  rules={[{ required: true, message: "Үнэ оруулна уу" }]}
                />
              </Col>
            </Row>
          );
        }}
      </ProFormList>
    </DrawerForm>
  );
};

export default Extra;
