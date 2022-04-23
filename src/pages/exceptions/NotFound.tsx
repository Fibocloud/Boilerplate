import { Button, Result } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => (
  <Result
    title="404"
    status="404"
    extra={
      <Link to="/">
        <Button type="primary">Буцах</Button>
      </Link>
    }
  />
);

export default NotFound;
