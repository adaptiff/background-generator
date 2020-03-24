import React from "react";
import download from "downloadjs";
import { Menu, Button, Icon, Dropdown } from "antd";

export interface Props {
  hasNonSVGObjects: boolean;
  dumpState: () => void;
}

export const DownloadButton: React.FC<Props> = ({
  hasNonSVGObjects,
  dumpState
}) => {
  return (
    <>
      {typeof window !== "undefined" &&
        window.location &&
        window.location.href.includes("localhost") && (
          <Button
            shape="circle"
            icon="download"
            style={{ marginRight: 10 }}
            onClick={dumpState}
          />
        )}
      <Dropdown.Button
        type="primary"
        size="large"
        icon={<Icon type="down" />}
        overlay={
          <Menu>
            {!hasNonSVGObjects && (
              <Menu.Item key="svg" onClick={downloadAsSVG}>
                as <strong>SVG</strong> file
              </Menu.Item>
            )}
            <Menu.Item key="png" onClick={downloadAsPNG}>
              as <strong>PNG</strong> file
            </Menu.Item>
            <Menu.Item key="jpeg" onClick={downloadAsJPEG}>
              as <strong>JPEG</strong> file
            </Menu.Item>
          </Menu>
        }
        onClick={downloadAsPNG}
      >
        <Icon type="download" />
        Download
      </Dropdown.Button>
    </>
  );
};
DownloadButton.displayName = "DownloadButton";

const downloadAsPNG = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.toBlob(blob => download(blob, "download.png", "image/png"));
};

const downloadAsSVG = () => {
  download(window["fabricCanvas"].toSVG(), "download.svg", "image/svg+xml");
};

const downloadAsJPEG = () => {
  download(
    window["fabricCanvas"].toDataURL({ format: "jpeg", quality: 0.95 }),
    "download.jpg",
    "image/jpeg"
  );
};

export default DownloadButton;
