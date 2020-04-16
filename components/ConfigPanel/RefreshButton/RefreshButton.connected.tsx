import React from "react";
import { Button } from "antd";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getHasRandomnessOnAnyField } from "../../../selectors";
import { refreshRandomSnapshot } from "../../../actions";

import s from "./RefreshButton.less";

export interface Props {}

export const RefreshButton: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const hasRandomness = useSelector(getHasRandomnessOnAnyField, shallowEqual);
  if (!hasRandomness) {
    return null;
  }
  return (
    <div
      className={s["refresh-button-container"]}
      onClick={() => dispatch(refreshRandomSnapshot())}
    >
      <Button icon="reload" type="link" className={s["button"]}>
        Refresh
      </Button>
    </div>
  );
};
RefreshButton.displayName = "RefreshButton";

export default RefreshButton;
