import React from "react";
import { Icon } from "antd";

import s from "./AddEmojiButton.less";

export interface Props {}

export const AddEmojiButton: React.FC<Props> = (props) => {
  return (
    <div className={s["root"]}>
      <Icon type="smile" className={s["icon"]} />
      <span>Emoji</span>
    </div>
  );
};
AddEmojiButton.displayName = "AddEmojiButton";

export default AddEmojiButton;
