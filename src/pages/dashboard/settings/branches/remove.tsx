import { deleteConfirm, deleteConfirmReg } from "@/config";
import { Branch } from "@/services/types";
import branch from "@/services/worker/admin/branch";
import { DeleteConfirm } from "@/types";
import useRequest from "@ahooksjs/use-request";
import { ModalForm, ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import React, { FC, useEffect, useRef } from "react";

interface Props {
  data?: Branch;
  onFinish: () => void;
  onCancel: () => void;
}

const Remove: FC<Props> = ({ data, onFinish, onCancel }) => {
  const formRef = useRef<ProFormInstance<DeleteConfirm>>();
  const remove = useRequest(branch.remove, {
    manual: true,
    onSuccess: () => message.success("Амжилттай устгалаа"),
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    if (data) {
      formRef.current?.resetFields();
    }
  }, [data]);

  return (
    <ModalForm<DeleteConfirm>
      width={500}
      visible={!!data}
      formRef={formRef}
      requiredMark={false}
      title="Салбар устгах"
      modalProps={{
        bodyStyle: {
          paddingBottom: 0,
          paddingTop: "0.382rem",
        },
        onCancel,
      }}
      submitter={{
        searchConfig: {
          resetText: "Буцах",
          submitText: "Устгах",
        },
        submitButtonProps: {
          danger: true,
        },
      }}
      onFinish={async (values) => {
        if (
          data &&
          values.confirm === deleteConfirm &&
          (await remove.run(data.id))
        ) {
          onFinish();
          return true;
        }
        return false;
      }}
    >
      <ProFormText
        name="confirm"
        label={
          <span>
            Та "<strong>{data?.name}</strong>" -г сонгосон байна. Сонголтоо
            баталгаажуулна уу. Энэ үйлдлийг буцаах боломжгүй. Хэрэв та итгэлтэй
            байгаа бол "<strong>{deleteConfirm}</strong>" гэж оруулна уу.
          </span>
        }
        placeholder={deleteConfirm}
        rules={[
          {
            required: true,
            whitespace: false,
            pattern: deleteConfirmReg,
            message: `Устгахдаа итгэлтэй байвал "${deleteConfirm}" гэж бөглөнө үү`,
          },
        ]}
      />
    </ModalForm>
  );
};

export default Remove;
