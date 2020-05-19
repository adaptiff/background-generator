import React from "react";
import classnames from "classnames";
import { Form, Layout } from "antd";
const { Sider } = Layout;
import NumberInput from "./NumberInput";
import BoolWithNumberInput from "./BoolWithNumberInput";
import Objects from "./Objects";
import Layouts from "./Layouts";
import { ConfigFieldType } from "../../types";
import Logo from "../Logo";
import RefreshButton from "./RefreshButton";
import { useSelector, shallowEqual } from "react-redux";
import { getHasRandomnessOnAnyField } from "../../selectors";

import s from "./ConfigPanel.less";

export interface Props {
  selectedObjectCount: number;
  objectColorCount: number;
  configFields: any[];
}

export const ConfigPanel: React.FC<Props> = ({
  selectedObjectCount,
  objectColorCount,
  configFields
}) => {
  const hasRandomness = useSelector(getHasRandomnessOnAnyField, shallowEqual);
  return (
    <Sider className={s["sider"]} width={330}>
      <Logo className={s["logo"]} />
      <Form
        layout="vertical"
        className={classnames(
          s["form"],
          hasRandomness && s["form-with-refresh"]
        )}
      >
        <RefreshButton />
        <Layouts />
        <Objects />
        {configFields.map((configField, index) => {
          let formField;
          if (configField.type === ConfigFieldType.Hidden) {
            return null;
          }
          if (configField.name === "withRandomColor" && objectColorCount <= 1) {
            return null;
          }
          if (
            configField.name === "withRandomObjectOrder" &&
            selectedObjectCount <= 1
          ) {
            return null;
          }
          switch (configField.type) {
            case ConfigFieldType.NumberInput:
              formField = <NumberInput configFieldName={configField.name} />;
              break;
            case ConfigFieldType.BoolWithNumberInput:
              formField = (
                <BoolWithNumberInput
                  boolConfigFieldName={configField.name}
                  strengthConfigFieldName={configField.strengthConfigFieldName}
                  withRandomness={configField.withRandomness}
                />
              );
              break;
          }
          return (
            <Form.Item key={index} label={configField.label}>
              {formField}
            </Form.Item>
          );
        })}
      </Form>
    </Sider>
  );
};
ConfigPanel.displayName = "ConfigPanel";

export default ConfigPanel;
