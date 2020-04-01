import React, { useState, useRef } from "react";
import classnames from "classnames";
import { ChromePicker } from "react-color";
import { Popover, Button } from "antd";
import { colorObjToString, colorObjToCSSBackground } from "../../utils";
import { Radio } from "antd";
import { Slider } from "antd";
import { Form } from "antd";
import { FillType, Color } from "../../types";
import { gradientPalettes } from "../../palettes";

import s from "./ColorInput.less";

export interface Props {
  color: Color;
  className?: string;
  setColor: (obj: Color) => void;
}

const getPredefinedColors = () => {
  return gradientPalettes.map(colors => ({
    type: FillType.Linear,
    values: colors,
    angle: 0
  }));
};

export const ColorInput: React.FC<Props> = ({ color, className, setColor }) => {
  const ref = useRef();
  const [activeColor, setActiveColor] = useState(0);
  const [isSelectingFromPredefined, setIsSelectingFromPredefined] = useState(
    false
  );

  return (
    <div ref={ref} className={classnames(s["root"], className)}>
      <Popover
        trigger="click"
        placement="right"
        content={
          <div className={s["popover-content"]}>
            <Radio.Group
              className={s["radio-group"]}
              onChange={f => f}
              value={!isSelectingFromPredefined && color.type}
            >
              <Radio.Button
                value={FillType.Solid}
                onChange={() => {
                  setColor({
                    ...color,
                    type: FillType.Solid
                  });
                  setIsSelectingFromPredefined(false);
                }}
              >
                Solid
              </Radio.Button>
              <Radio.Button
                value={FillType.Linear}
                onChange={() => {
                  setColor({
                    ...color,
                    type: FillType.Linear,
                    angle: color.angle ?? 0
                  });
                  setIsSelectingFromPredefined(false);
                }}
              >
                Linear
              </Radio.Button>
              <Radio.Button
                value={FillType.Radial}
                onChange={() => {
                  setColor({
                    ...color,
                    type: FillType.Radial,
                    xShift: color.xShift ?? 0,
                    yShift: color.yShift ?? 0
                  });
                  setIsSelectingFromPredefined(false);
                }}
              >
                Radial
              </Radio.Button>
            </Radio.Group>
            {color.type !== FillType.Solid && !isSelectingFromPredefined && (
              <div className={s["fill-preview-wrapper"]}>
                <div
                  className={classnames(
                    s["preview-color-box"],
                    activeColor === 0 && s["preview-color-box-active"]
                  )}
                  onClick={() => setActiveColor(0)}
                  style={{ left: 0 }}
                >
                  <div className={s["preview-color-box-inner"]} />
                </div>
                <div
                  className={classnames(
                    s["preview-color-box"],
                    activeColor === 1 && s["preview-color-box-active"]
                  )}
                  onClick={() => setActiveColor(1)}
                  style={{ right: 0 }}
                >
                  <div className={s["preview-color-box-inner"]} />
                </div>
                <div
                  className={s["fill-preview"]}
                  style={{
                    background: `linear-gradient(to right, ${colorObjToString(
                      color.values[0]
                    )}, ${colorObjToString(color.values[1])})`
                  }}
                />
              </div>
            )}
            {!isSelectingFromPredefined && (
              <ChromePicker
                color={color.values[activeColor]}
                onChange={({ rgb }) => {
                  const colorValues = [...color.values];
                  colorValues[activeColor] = rgb;
                  setColor({ ...color, values: colorValues });
                }}
              />
            )}
            {!isSelectingFromPredefined && (
              <Form layout="vertical">
                {color.type === FillType.Linear && (
                  <Form.Item label="Angle" className={s["form-item"]}>
                    <Slider
                      className={s["slider"]}
                      min={-180}
                      max={180}
                      value={color.angle}
                      onChange={value =>
                        setColor({ ...color, angle: value as number })
                      }
                    />
                  </Form.Item>
                )}
                {color.type === FillType.Radial && (
                  <>
                    <Form.Item label="X-Shift" className={s["form-item"]}>
                      <Slider
                        className={s["slider"]}
                        min={-100}
                        max={100}
                        value={color.xShift}
                        onChange={value =>
                          setColor({ ...color, xShift: value as number })
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Y-Shift" className={s["form-item"]}>
                      <Slider
                        className={s["slider"]}
                        min={-100}
                        max={100}
                        value={color.yShift}
                        onChange={value =>
                          setColor({ ...color, yShift: value as number })
                        }
                      />
                    </Form.Item>
                  </>
                )}
              </Form>
            )}
            <div className={s["predefined-colors"]}>
              {getPredefinedColors()
                .slice(0, isSelectingFromPredefined ? 25 : 4)
                .map((color, index) => (
                  <div
                    key={index}
                    className={s["predefined-color"]}
                    style={{ background: colorObjToCSSBackground(color) }}
                    onClick={() => {
                      setColor(color);
                    }}
                  />
                ))}
              {!isSelectingFromPredefined && (
                <Button
                  className={classnames(
                    s["palette-button"],
                    s["predefined-color"]
                  )}
                  icon="ellipsis"
                  onClick={() => setIsSelectingFromPredefined(true)}
                />
              )}
            </div>
          </div>
        }
      >
        <div
          className={s["color"]}
          style={{
            background: colorObjToCSSBackground(color)
          }}
        />
      </Popover>
    </div>
  );
};
ColorInput.displayName = "ColorInput";

export default ColorInput;
