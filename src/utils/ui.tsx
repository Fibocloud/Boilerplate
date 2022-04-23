import { Badge } from "antd";
import React from "react";
export const renderBadge = (count: number) => {
  return (
    <Badge
      count={count || "-"}
      style={{
        marginTop: -2,
        marginLeft: 4,
        color: "#1890FF",
        backgroundColor: "#E6F7FF",
      }}
    />
  );
};
