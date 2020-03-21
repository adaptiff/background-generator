import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Input, Slider } from "antd";
import { getConfigValue, getConfigField } from "../../../selectors";
import { setConfigValue } from "../../../actions";

import s from "./NumberInput.less";

export interface Props {
  configFieldName: string;
}

export const NumberInput: React.FC<Props> = ({ configFieldName }) => {
  const dispatch = useDispatch();
  const configValue = useSelector(
    getConfigValue(configFieldName),
    shallowEqual
  );
  const configField = useSelector(
    getConfigField(configFieldName),
    shallowEqual
  );

  const setConfigValueFromInput = e =>
    dispatch(
      setConfigValue({
        configFieldName,
        configValue: +e.target.value
      })
    );

  return (
    <div className={s["config-input-wrapper"]}>
      <Input
        key={configValue}
        defaultValue={configValue}
        className={s["config-input"]}
        onBlur={setConfigValueFromInput}
        onPressEnter={setConfigValueFromInput}
      />
      <Slider
        min={configField.minValue}
        max={configField.maxValue}
        value={configValue}
        onChange={value =>
          dispatch(
            setConfigValue({
              configFieldName,
              configValue: value
            })
          )
        }
      />
    </div>
  );
};
NumberInput.displayName = "NumberInput";

export default NumberInput;
