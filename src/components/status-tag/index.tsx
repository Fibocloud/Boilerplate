import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

interface Props {
  status: boolean | { label: React.ReactNode; color: string };
  icon?: React.ReactNode;
  showIcon?: boolean;
  labels?: { true?: string; false?: string };
}

const StatusTag: React.FC<Props> = ({
  status,
  icon,
  labels,
  showIcon = false
}) => {
  const getLabel = () => {
    if (status) {
      return labels?.true || "Тийм";
    }
    return labels?.false || "Үгүй";
  };
  switch (typeof status) {
    case "boolean":
      return (
        <Tag
          icon={
            icon ||
            (showIcon &&
              (status ? <CheckCircleOutlined /> : <CloseCircleOutlined />))
          }
          color={status ? "success" : "error"}
          className="m-0"
        >
          {getLabel()}
        </Tag>
      );
    case "object":
      return (
        <Tag icon={icon} color={status.color} className="m-0">
          {status.label}
        </Tag>
      );
    default:
      return null;
  }
};

export default StatusTag;
