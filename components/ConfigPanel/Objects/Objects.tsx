import React from "react";
import classnames from "classnames";
import objects from "../../../objects";
import ImageUpload from "./ImageUpload";
import { Form, Button } from "antd";
import BorderFrame from "../../BorderFrame";
import { ImageObject } from "../../../types";

import s from "./Objects.less";
import useCollapse from "../../../hooks/useCollapse";

export interface Props {
  uploadedObjects: ImageObject[];
  selectedObjectIds: number[];
  selectObject: ({ id: number }) => void;
  selectAsOnlyObject: ({ id: number }) => void;
  deselectObject: ({ id: number }) => void;
}

export const Objects: React.FC<Props> = ({
  uploadedObjects,
  selectedObjectIds,
  selectObject,
  selectAsOnlyObject,
  deselectObject
}) => {
  const { isCollapsed, collapseButton } = useCollapse();
  return (
    <Form.Item label="Objects" className={s["form-item-with-show-more"]}>
      <div className={s["layout-items"]}>
        <ImageUpload />
        {[...uploadedObjects, ...objects]
          .slice(0, isCollapsed ? 3 : undefined)
          .map((object, index) => {
            const isSelected = selectedObjectIds.includes(object.id);
            return (
              <BorderFrame
                isActive={isSelected}
                key={index}
                className={classnames(s["item-thumb"])}
                onClick={() =>
                  isSelected
                    ? deselectObject({ id: object.id })
                    : selectAsOnlyObject({ id: object.id })
                }
              >
                {!isSelected && (
                  <Button
                    className={s["plus-button"]}
                    shape="circle"
                    icon="plus"
                    size="small"
                    onClick={e => {
                      selectObject({ id: object.id });
                      e.stopPropagation();
                    }}
                  />
                )}
                <img
                  src={object.src}
                  alt="image.png"
                  style={{
                    width: object.thumbSize
                  }}
                />
              </BorderFrame>
            );
          })}
      </div>
      {collapseButton}
    </Form.Item>
  );
};
Objects.displayName = "Objects";

export default Objects;
