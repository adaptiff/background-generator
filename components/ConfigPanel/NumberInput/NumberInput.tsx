import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Input, Slider } from "antd";
import { getConfigValue, getConfigField } from "../../../selectors";
import { setConfigValue } from "../../../actions";

import s from "./NumberInput.less";

export interface Props {
  configFieldName: string;
}

const refs = {};
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
        ref={node => {
          refs[configFieldName] = node;
        }}
        defaultValue={configValue}
        className={s["config-input"]}
        onBlur={setConfigValueFromInput}
        onPressEnter={e => {
          setConfigValueFromInput(e);
          setTimeout(() => {
            refs[configFieldName].select();
          }, 1);
        }}
      />
      <Slider
        min={configField.minValue}
        max={configField.maxValue}
        step={configField.step}
        value={configValue}
        onChange={value =>
          dispatch(
            setConfigValue({
              configFieldName,
              configValue: value
            })
          )
        }
        onAfterChange={value => {
          if (value === configField.maxValue) {
            refs[configFieldName].select();
          }
        }}
      />
    </div>
  );
};
NumberInput.displayName = "NumberInput";

export default NumberInput;
