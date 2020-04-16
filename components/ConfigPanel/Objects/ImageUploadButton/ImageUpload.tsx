import React from "react";
import { Icon } from "antd";

import s from "./ImageUpload.less";

export interface Props {
  addUploadedObject: (obj: { src: string; type: string }) => void;
}

export const ImageUpload: React.FC<Props> = ({ addUploadedObject }) => {
  const onFileChange = e => {
    const file = e.target.files[0];
    if (!file || !window["URL"] || !window["URL"].createObjectURL) {
      return;
    }
    const objectURL = window["URL"].createObjectURL(file);
    addUploadedObject({ src: objectURL, type: file.type });
    const fileReader = new FileReader();
    fileReader.onload = onFileReaderLoad;
    fileReader.readAsDataURL(file);
  };

  const onFileReaderLoad = e => {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.onload = () => {
      window["loadedFile"] = {
        imageUrl: e.target.result,
        width: img.clientWidth,
        height: img.clientHeight
      };
      document.body.removeChild(img);
    };
    document.body.appendChild(img);
  };
  return (
    <div className={s["upload-item-thumb-wrapper"]}>
      <input
        type="file"
        name="file"
        id="file"
        className={s["file-input"]}
        onChange={onFileChange}
      />
      <label className={s["file-input-label"]} htmlFor="file" />
      <div className={s["upload-item-thumb"]}>
        <Icon type="upload" />
        <span>Upload</span>
      </div>
    </div>
  );
};
ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
