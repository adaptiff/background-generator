import React from "react";
import { Icon } from "antd";

import s from "./AddEmojiButton.less";

export interface Props {
  addEmojiObject: (obj: { src: string }) => void;
}

export const AddEmojiButton: React.FC<Props> = ({ addEmojiObject }) => {
  return (
    <div className={s["root"]} onClick={() => addEmojiObject({ src: "🙃" })}>
      <Icon type="smile" className={s["icon"]} />
      <span>Emoji</span>
    </div>
  );
};
AddEmojiButton.displayName = "AddEmojiButton";

export default AddEmojiButton;
