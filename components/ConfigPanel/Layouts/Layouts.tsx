import React from "react";
import classnames from "classnames";
import { Form } from "antd";
import BorderFrame from "../../BorderFrame";
import layouts from "../../../layouts";

import s from "./Layouts.less";
import useCollapse from "../../../hooks/useCollapse";

export interface Props {
  selectedLayoutId: number;
  selectLayout: ({ id: number }) => void;
}

export const Layouts: React.FC<Props> = ({
  selectedLayoutId,
  selectLayout
}) => {
  const { isCollapsed, collapseButton } = useCollapse();
  return (
    <Form.Item label="Layouts" className={s["form-item-with-show-more"]}>
      <div className={s["layouts"]}>
        {layouts.slice(0, isCollapsed ? 3 : undefined).map((layout, index) => (
          <BorderFrame
            key={index}
            isActive={layout.id === selectedLayoutId}
            className={classnames(s["layout-thumb"])}
            onClick={() => selectLayout({ id: layout.id })}
          >
            <img src={layout.src} alt="image.png" />
          </BorderFrame>
        ))}
      </div>
      {collapseButton}
    </Form.Item>
  );
};
Layouts.displayName = "Layouts";

export default Layouts;
