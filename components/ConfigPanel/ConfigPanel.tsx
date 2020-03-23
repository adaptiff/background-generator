import React from "react";
import { Form, Layout } from "antd";
const { Sider } = Layout;
import NumberInput from "./NumberInput";
import RandomnessInput from "./RandomnessInput";
import Objects from "./Objects";
import Layouts from "./Layouts";
import { ConfigFieldType } from "../../types";
import Logo from "../Logo";

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
  return (
    <Sider className={s["sider"]} width={330}>
      <Logo />
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
            case ConfigFieldType.RandomnessInput:
              formField = (
                <RandomnessInput
                  boolConfigFieldName={configField.name}
                  strengthConfigFieldName={configField.strengthConfigFieldName}
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
            <RandomnessInput boolConfigFieldName="withRandomColor" />
          </Form.Item>
        )}
        {selectedObjectCount > 1 && (
          <Form.Item label="Randomize Object Order">
            <RandomnessInput boolConfigFieldName="withRandomObjectOrder" />
          </Form.Item>
        )}
      </Form>
    </Sider>
  );
};
ConfigPanel.displayName = "ConfigPanel";

export default ConfigPanel;
