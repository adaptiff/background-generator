import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Switch, Button } from "antd";
import NumberInput from "../NumberInput";
import { setConfigValue, refreshRandomSnapshot } from "../../../actions";
import { getConfigValue } from "../../../selectors";

import s from "./RandomnessInput.less";

export interface Props {
  boolConfigFieldName: string;
  strengthConfigFieldName?: string;
}

export const RandomnessInput: React.FC<Props> = ({
  boolConfigFieldName,
  strengthConfigFieldName
}) => {
  const dispatch = useDispatch();
  const withRandomness = useSelector(
    getConfigValue(boolConfigFieldName),
    shallowEqual
  );
  return (
    <>
      <div className={s["top-row"]}>
        <Switch
          defaultChecked={withRandomness}
          className={s["switch"]}
          onChange={() =>
            dispatch(
              setConfigValue({
                configFieldName: boolConfigFieldName,
                configValue: !withRandomness
              })
            )
          }
        />
        {withRandomness && (
          <Button
            icon="reload"
            className={s["refresh-button"]}
            onClick={() => dispatch(refreshRandomSnapshot())}
          >
            Refresh
          </Button>
        )}
      </div>
      {withRandomness && strengthConfigFieldName && (
        <NumberInput configFieldName={strengthConfigFieldName} />
      )}
    </>
  );
};
RandomnessInput.displayName = "RandomnessInput";

export default RandomnessInput;
