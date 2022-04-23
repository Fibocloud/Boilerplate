import { SubmitterProps } from "@ant-design/pro-form/lib/components/Submitter";
import { Button, FormInstance } from "antd";
import React from "react";

const StepFormSubmitter = (stepCount: number) => {
  const submitter: SubmitterProps<{
    step: number;
    onPre: () => void;
    form?: FormInstance<any> | undefined;
  }> = {
    render: (props) => {
      switch (props.step) {
        case 0:
          return (
            <Button
              key="next"
              type="primary"
              onClick={() => props.onSubmit?.()}
            >
              Үргэлжлүүлэх
            </Button>
          );
        case stepCount - 1:
          return (
            <>
              <Button key="pre" onClick={() => props.onPre?.()}>
                Буцах
              </Button>
              <Button
                key="save"
                type="primary"
                onClick={() => props.onSubmit?.()}
              >
                Хадгалах
              </Button>
            </>
          );
        default:
          return (
            <>
              <Button key="pre" onClick={() => props.onPre?.()}>
                Буцах
              </Button>
              <Button
                key="next"
                type="primary"
                onClick={() => props.onSubmit?.()}
              >
                Үргэлжлүүлэх
              </Button>
            </>
          );
      }
    },
  };
  return submitter;
};

export default StepFormSubmitter;
