import React from "react";
import classnames from "classnames";
import objects from "../../../objects";
import ImageUploadButton from "./ImageUploadButton";
import { Form, Button } from "antd";
import BorderFrame from "../../BorderFrame";
import { ImageObject } from "../../../types";
import AddEmojiButton from "./AddEmojiButton";
import useCollapse from "../../../hooks/useCollapse";

import s from "./Objects.less";

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
  deselectObject,
}) => {
  const { isCollapsed, collapseButton } = useCollapse();

  const allObjects = [...uploadedObjects, ...objects];

  const renderObject = (object, index) => {
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
            onClick={(e) => {
              selectObject({ id: object.id });
              e.stopPropagation();
            }}
          />
        )}
        <img
          src={object.src}
          alt="image.png"
          style={{
            width: object.thumbSize,
          }}
        />
      </BorderFrame>
    );
  };

  return (
    <Form.Item label="Objects" className={s["form-item-with-show-more"]}>
      <div className={s["layout-items"]}>
        <ImageUploadButton />
        {allObjects.slice(0, 3).map(renderObject)}
        {!isCollapsed && <AddEmojiButton />}
        {!isCollapsed && allObjects.slice(3).map(renderObject)}
      </div>
      {collapseButton}
    </Form.Item>
  );
};
Objects.displayName = "Objects";

export default Objects;
