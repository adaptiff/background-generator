import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Switch, Button, Tooltip } from "antd";
import NumberInput from "../NumberInput";
import { setConfigValue, refreshRandomSnapshot } from "../../../actions";
import { getConfigValue } from "../../../selectors";

import s from "./BoolWithNumberInput.less";

export interface Props {
  boolConfigFieldName: string;
  strengthConfigFieldName?: string;
  withRandomness?: boolean;
}

export const BoolWithNumberInput: React.FC<Props> = ({
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
          key={`${boolConfigFieldName}-${withRandomness}`}
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
      </div>
      {withRandomness && strengthConfigFieldName && (
        <NumberInput configFieldName={strengthConfigFieldName} />
      )}
    </>
  );
};
BoolWithNumberInput.displayName = "BoolWithNumberInput";

export default BoolWithNumberInput;
