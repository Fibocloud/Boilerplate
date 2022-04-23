import { Button, Result } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotAuthorized: FC = () => (
  <Result
    title="403"
    status="403"
    extra={
      <Link to="/">
        <Button type="primary">Буцах</Button>
      </Link>
    }
  />
);

export default NotAuthorized;
