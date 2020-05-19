import React, { useState } from "react";
import { Popover, Icon } from "antd";
import { NimblePicker } from "emoji-mart";
import data from "emoji-mart/data/apple.json";

import s from "./AddEmojiButton.less";

export interface Props {
  addEmojiObject: (obj: { src: string }) => void;
}

export const AddEmojiButton: React.FC<Props> = ({ addEmojiObject }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  return (
    <Popover
      visible={isPopoverVisible}
      onVisibleChange={visible => setIsPopoverVisible(visible)}
      trigger="click"
      placement="right"
      content={
        <NimblePicker
          set="apple"
          native={true}
          data={data}
          showPreview={false}
          onClick={emoji => {
            addEmojiObject({ src: emoji.native });
            setIsPopoverVisible(false);
          }}
        />
      }
    >
      <div className={s["root"]}>
        <Icon type="smile" className={s["icon"]} />
        <span>Emoji</span>
      </div>
    </Popover>
  );
};
AddEmojiButton.displayName = "AddEmojiButton";

export default AddEmojiButton;
