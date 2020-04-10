import React from "react";

import s from "./IconmnstrButton.less";
import { Icon, Tooltip } from "antd";

export interface Props {}

export const IconmnstrButton: React.FC<Props> = props => {
  return (
    <Tooltip title="iconmonstr.com">
      <a target="_blank" href="https://iconmonstr.com/" className={s["root"]}>
        <Icon type="search" className={s["icon"]} />
        <span className={s["label"]}>Icons</span>
      </a>
    </Tooltip>
  );
};
IconmnstrButton.displayName = "IconmnstrButton";

export default IconmnstrButton;
