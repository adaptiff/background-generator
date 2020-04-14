import React from "react";
import { Icon } from "antd";

import s from "./IconmnstrButton.less";

export interface Props {}

export const IconmnstrButton: React.FC<Props> = props => {
  return (
    <a target="_blank" href="https://iconmonstr.com/" className={s["root"]}>
      <Icon type="search" className={s["icon"]} />
      <span className={s["label"]}>Icons</span>
    </a>
  );
};
IconmnstrButton.displayName = "IconmnstrButton";

export default IconmnstrButton;
