import React from "react";
import { Button } from "antd";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getHasRandomnessOnAnyField } from "../../../selectors";
import { refreshRandomSnapshot } from "../../../actions";

import s from "./RefreshButton.less";

export interface Props {
  className?: string;
}

export const RefreshButton: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const hasRandomness = useSelector(getHasRandomnessOnAnyField, shallowEqual);
  if (!hasRandomness) {
    return null;
  }
  return (
    <div className={s["refresh-button-container"]}>
      <Button
        icon="reload"
        type="link"
        className={className}
        onClick={() => dispatch(refreshRandomSnapshot())}
      >
        Refresh
      </Button>
    </div>
  );
};
RefreshButton.displayName = "RefreshButton";

export default RefreshButton;
