import { Typography } from "antd";
import React from "react";

interface Props {
  children?: string;
}

const Ellipsis = ({ children }: Props): JSX.Element => {
  if (!children) return <>-</>;
  return (
    <Typography.Text ellipsis={{ tooltip: children }}>
      {children}
    </Typography.Text>
  );
};

export default Ellipsis;
