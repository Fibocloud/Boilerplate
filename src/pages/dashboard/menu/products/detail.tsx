import { Product, Tag } from "@/services/types";
import product from "@/services/worker/admin/product";
import { fileToUrl, moneyFormat } from "@/utils";
import useRequest from "@ahooksjs/use-request";
import ProDescriptions from "@ant-design/pro-descriptions";
import { Divider, Drawer, Image, message, Tag as AntTag } from "antd";
import React, { FC, useEffect } from "react";

interface Props {
  data?: Product;
  onCancel: () => void;
}

const Detail: FC<Props> = ({ data, onCancel }) => {
  const getDetail = useRequest(product.get, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    if (data?.id) {
      getDetail.run(data.id);
    }
  }, [data]);

  return (
    <Drawer
      width={840}
      visible={!!data}
      onClose={onCancel}
      forceRender={true}
      destroyOnClose={true}
      footerStyle={{ borderTop: 0 }}
      headerStyle={{ borderBottom: 0 }}
      title={`Бүтээгдэхүүний мэдээлэл (${data?.name})`}
    >
      <Divider>Бүтээгдэхүүн</Divider>
      <ProDescriptions
        column={2}
        layout="vertical"
        loading={getDetail.loading}
        dataSource={getDetail.data}
        labelStyle={{ fontWeight: "bold" }}
      >
        <ProDescriptions.Item label="Нэр" dataIndex="name" />
        <ProDescriptions.Item
          label="Зураг"
          dataIndex="cover_path"
          render={(_value, record) => (
            <Image width={150} src={fileToUrl(record.cover_path)} />
          )}
        />
        <ProDescriptions.Item
          label="Ангилал"
          dataIndex="category"
          render={(_value, record) => record?.category?.name}
        />
        <ProDescriptions.Item
          label="Таг"
          dataIndex="tags"
          render={(_value, record) =>
            record.tags?.map((tag: Tag) => {
              return (
                <AntTag key={tag.id} color={tag?.color}>
                  {tag?.name}
                </AntTag>
              );
            })
          }
        />
        <ProDescriptions.Item
          label="Орц"
          dataIndex="ingredient"
          render={(_value, record) => record?.ingredient}
        />
        
      </ProDescriptions>

      <Divider>Үнийн мэдээлэл</Divider>
      <ProDescriptions
        column={3}
        layout="vertical"
        dataSource={data}
        labelStyle={{ fontWeight: "bold" }}
      >
        {data?.prices?.map((price, index) => {
          return (
            <ProDescriptions.Item
              label={price?.size?.name}
              dataIndex={["prices", index, "size"]}
              render={() => `${moneyFormat(price?.total_price)} ₮`}
            />
          );
        })}
      </ProDescriptions>
    </Drawer>
  );
};

export default Detail;
