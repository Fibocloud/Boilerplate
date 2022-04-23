import { Col, Row } from "antd";
import React, { FC } from "react";

const Footer: FC = () => (
  <Row
    justify="center"
    style={{
      bottom: 10,
      padding: 10,
      background: "#e8e8e8",
    }}
  >
    <Col>
      <span
        style={{
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        ©{new Date().getFullYear()} Powered by{" "}
        <a
          style={{ cursor: "pointer", color: "#272A49" }}
          href="https://fibo.cloud/"
          target="_blank"
        >
          Fibo cloud LLC
        </a>
      </span>
    </Col>
  </Row>
);

export default Footer;
