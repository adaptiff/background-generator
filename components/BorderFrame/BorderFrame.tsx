import React from "react";
import classnames from "classnames";

import s from "./BorderFrame.less";

export interface Props {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const BorderFrame: React.FC<Props> = ({
  children,
  isActive,
  className,
  onClick
}) => {
  return (
    <div
      className={classnames(s["root"], isActive && s["active"], className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
BorderFrame.displayName = "BorderFrame";

export default BorderFrame;
