import React from "react";
import { Form, Layout } from "antd";
import { Tabs } from "antd";
const { Sider } = Layout;
import NumberInput from "./NumberInput";
import BoolWithNumberInput from "./BoolWithNumberInput";
import Objects from "./Objects";
import Layouts from "./Layouts";
import { ConfigFieldType } from "../../types";
import Logo from "../Logo";
import RefreshButton from "./RefreshButton";
import Presets from "./Presets/";

import s from "./ConfigPanel.less";

const { TabPane } = Tabs;

export interface Props {
  selectedObjectCount: number;
  objectColorCount: number;
  configFields: any[];
}

export const ConfigPanel: React.FC<Props> = ({
  selectedObjectCount,
  objectColorCount,
  configFields,
}) => {
  return (
    <Sider className={s["sider"]} width={330}>
      <Logo className={s["logo"]} />
      <Tabs defaultActiveKey="2">
        <TabPane tab=" " key="1"></TabPane>
        <TabPane tab="Custom" key="2">
          <Form layout="vertical" className={s["form"]}>
            <RefreshButton />
            <Layouts />
            <Objects />
            {configFields.map((configField, index) => {
              let formField;
              if (configField.type === ConfigFieldType.Hidden) {
                return null;
              }
              if (
                configField.name === "withRandomColor" &&
                objectColorCount <= 1
              ) {
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
                  formField = (
                    <NumberInput configFieldName={configField.name} />
                  );
                  break;
                case ConfigFieldType.BoolWithNumberInput:
                  formField = (
                    <BoolWithNumberInput
                      boolConfigFieldName={configField.name}
                      strengthConfigFieldName={
                        configField.strengthConfigFieldName
                      }
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
        </TabPane>
        <TabPane tab="Presets" key="3" className={s["presets-tab"]}>
          <Presets />
        </TabPane>
      </Tabs>
    </Sider>
  );
};
ConfigPanel.displayName = "ConfigPanel";

export default ConfigPanel;
