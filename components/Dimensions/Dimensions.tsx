import React from "react";
import { Icon, Input, Dropdown, Menu, Tooltip, Button } from "antd";
import s from "./Dimensions.less";

export interface Props {
  canvasWidth: number;
  canvasHeight: number;
  setCanvasDimensions: (dimensions: { width: number; height: number }) => void;
}

const presetDimensions = [
  { width: 600, height: 600, label: "Square" },
  { width: 1280, height: 720, label: "Youtube Thumb" },
  { width: 940, height: 788, label: "Facebook Post" },
  { width: 830, height: 315, label: "Facebook Cover" },
  { width: 1024, height: 512, label: "Twitter Post" },
  { width: 1500, height: 500, label: "Twitter Cover" },
  { width: 1080, height: 1080, label: "Instagram Square" },
  { width: 1080, height: 1920, label: "Instagram Story" }
];

// onClick={() => dispatch(refreshRandomSnapshot())}

export const Dimensions: React.FC<Props> = ({
  canvasWidth,
  canvasHeight,
  setCanvasDimensions
}) => {
  const widthInputCallback = e =>
    setCanvasDimensions({ width: +e.target.value, height: canvasHeight });
  const heightInputCallback = e =>
    setCanvasDimensions({ width: canvasWidth, height: +e.target.value });

  return (
    <div
      key={`${canvasWidth}-${canvasHeight}`}
      className={s["dimensions-form-wrapper"]}
    >
      <Tooltip title="Refresh">
        <Button icon="reload" shape="circle" className={s["refresh-button"]} />
      </Tooltip>
      <Input
        key={`w-${canvasWidth}`}
        className={s["dimensions-input"]}
        defaultValue={canvasWidth}
        onBlur={widthInputCallback}
        onPressEnter={widthInputCallback}
      />
      <span className={s["dimensions-x"]}>×</span>
      <Input
        key={`h-${canvasHeight}`}
        className={s["dimensions-input"]}
        defaultValue={canvasHeight}
        onBlur={heightInputCallback}
        onPressEnter={heightInputCallback}
      />
      <Dropdown.Button
        className={s["dimensions-dropdown"]}
        size="large"
        icon={<Icon type="down" />}
        overlay={
          <Menu>
            {presetDimensions.map(({ width, height, label }, index) => (
              <Menu.Item
                key={index}
                onClick={() => setCanvasDimensions({ width, height })}
              >
                <div className={s["menu-item"]}>
                  <div>{label}</div>
                  <div>
                    {width} × {height}
                  </div>
                </div>
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        Dimensions
      </Dropdown.Button>
    </div>
  );
};
Dimensions.displayName = "Dimensions";

export default Dimensions;
