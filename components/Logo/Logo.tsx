import React from "react";
import classnames from "classnames";
import { Tooltip } from "antd";

import s from "./Logo.less";

export interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <h1 className={classnames(s["logo"], className)}>
      <Tooltip placement="bottom" title="adaptiff">
        <div className={s["logo-symbol"]}>
          <div className={s["block-1"]} />
          <div className={s["block-2"]} />
        </div>
      </Tooltip>
      <a href="/">background generator</a>
    </h1>
  );
};
Logo.displayName = "Logo";

export default Logo;
