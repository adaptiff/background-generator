import React from "react";
import classnames from "classnames";

import s from "./BorderFrame.less";

export interface Props {
  className?: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

export const BorderFrame: React.FC<Props> = ({
  children,
  isActive,
  className,
  href,
  onClick,
}) => {
  return (
    <a
      className={classnames(s["root"], isActive && s["active"], className)}
      onClick={onClick}
      href={href}
    >
      {children}
    </a>
  );
};
BorderFrame.displayName = "BorderFrame";

export default BorderFrame;
