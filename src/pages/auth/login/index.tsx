import { useStore } from "@/contexts";
import { Action } from "@/contexts/types";
import { useRequest } from "ahooks";
import ProCard from "@ant-design/pro-card";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, message } from "antd";
import React, { FC, useRef } from "react";
import { useHistory } from "react-router";
import auth from "@/services/worker/auth";
import { LoginData } from "@/services/worker/auth/types";

const Login: FC = () => {
  const history = useHistory();
  const [, setAuth] = useStore();
  const userData = auth.getRememberUser();
  const formRef = useRef<ProFormInstance<LoginData>>();
  const login = useRequest(auth.login, {
    manual: true,
    onSuccess: (data, [values]) => {
      auth.rememberUser(values);
      auth.saveToken(data.token);
      setAuth([Action.SIGN_IN, data.user]);
      history.push("/dashboard/order/product");
      message.success("Амжилттай нэвтэрлээ");
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return (
    <div>
      <ProCard>
        <LoginForm<LoginData>
          formRef={formRef}
          onFinish={async (data: LoginData) => {
            await login.run(data);
          }}
          initialValues={userData}
          submitter={{
            render: () => (
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={login.loading}
              >
                Нэвтрэх
              </Button>
            ),
          }}
        >
          <ProFormText
            width="md"
            name="email"
            placeholder="Нэвтрэх нэр"
            fieldProps={{ size: "large" }}
            rules={[
              {
                required: true,
                message: "Нэвтрэх нэр оруулна уу",
              },
            ]}
          />
          <ProFormText.Password
            width="md"
            name="password"
            placeholder="Нууц үг"
            fieldProps={{ size: "large" }}
            rules={[
              {
                required: true,
                message: "Нууц үгээ оруулна уу",
              },
            ]}
          />
          <ProFormCheckbox name="remember">Намайг сана</ProFormCheckbox>
        </LoginForm>
      </ProCard>
    </div>
  );
};

export default Login;
