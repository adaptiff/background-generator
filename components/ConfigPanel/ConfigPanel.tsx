import React from "react";
import { Form, Layout, Button } from "antd";
const { Sider } = Layout;
import NumberInput from "./NumberInput";
import BoolWithNumberInput from "./BoolWithNumberInput";
import Objects from "./Objects";
import Layouts from "./Layouts";
import { ConfigFieldType } from "../../types";
import Logo from "../Logo";

import s from "./ConfigPanel.less";
import RefreshButton from "./RefreshButton";

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
  return (
    <Sider className={s["sider"]} width={330}>
      <Logo className={s["logo"]} />
      <Form layout="vertical" className={s["form"]}>
        <Layouts />
        <Objects />
        {configFields.map((configField, index) => {
          let formField;
          if (configField.type === ConfigFieldType.Hidden) {
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
        {objectColorCount > 1 && (
          <Form.Item label="Randomize Color">
            <BoolWithNumberInput boolConfigFieldName="withRandomColor" />
          </Form.Item>
        )}
        {selectedObjectCount > 1 && (
          <Form.Item label="Randomize Object Order">
            <BoolWithNumberInput boolConfigFieldName="withRandomObjectOrder" />
          </Form.Item>
        )}
      </Form>
      <RefreshButton className={s["refresh-button-container"]} />
    </Sider>
  );
};
ConfigPanel.displayName = "ConfigPanel";

export default ConfigPanel;
