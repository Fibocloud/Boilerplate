import { message } from "antd";
import http from "../index";
import { FileRecord, MultiFileUpload, SingleFileUpload } from "./types";

namespace file {
  export const upload = async ({
    name,
    bucket_name,
    file,
  }: SingleFileUpload) => {
    const body = new FormData();

    body.append("name", name);
    body.append("file", file);
    body.append("bucket_name", bucket_name);

    return http.post<FileRecord>("xxx/upload", { body });
  };

  export const uploads = async ({
    files,
    names,
    bucket_name,
  }: MultiFileUpload) => {
    const body = new FormData();

    files.forEach((file, ind) => {
      body.append("names", names[ind]);
      body.append("files", file.originFileObj);
      body.append("bucket_name", bucket_name);
    });

    return http.post<FileRecord[]>("xxx/multi/upload", { body });
  };

  export const isUploadAble = (file?: any, limit = 10485760) => {
    if ((file?.size || 0) < limit) return true;
    return false;
  };
  export const isImageAcceptable = (file: File, sizeLimit?: number) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    if (!isJpgOrPng) {
      message.error("Зөвхөн PNG, JPEG, GIF зураг оруулна уу.");
    }
    // sizelimit kb
    const isLt2M = file.size / 1024 < (sizeLimit || 2048);
    if (!isLt2M) {
      message.error(`Зургийн багтаамжыг хязгаар ${sizeLimit || 2048}kb`);
    }
    return isJpgOrPng && isLt2M;
  };
}

export default file;
