import { fileToUrl, isImage } from "@/utils";
import { FileOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { FC } from "react";
import styles from "./styles.module.less";

interface Props {
  files: string[];
}

const Files: FC<Props> = ({ files }) => {
  return (
    <div className={styles.container}>
      {files.map((item) =>
        isImage(item || "") ? (
          <Image
            key={item}
            alt={item}
            className={styles.image}
            src={fileToUrl(item)}
          />
        ) : (
          <a
            key={item}
            target="_blank"
            href={fileToUrl(item)}
            rel="noopener noreferrer"
            className={styles.file}
          >
            <FileOutlined style={{ fontSize: 24 }} />
          </a>
        )
      )}
    </div>
  );
};

export default Files;
