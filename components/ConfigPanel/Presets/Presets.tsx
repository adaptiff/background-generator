import React from "react";
import classnames from "classnames";
import BorderFrame from "../../BorderFrame";
import presets from "../../../backgrounds";

import s from "./Presets.less";

export interface Props {
  selectedPresetId: number;
}

export const Presets: React.FC<Props> = ({ selectedPresetId }) => {
  return (
    <div className={s["layouts"]}>
      {presets.map((preset, index) => (
        <BorderFrame
          key={index}
          isActive={preset.id === selectedPresetId}
          className={classnames(s["layout-thumb"])}
          href={`/background/${preset.id}`}
        >
          <img src={`/background_thumbs/${preset.id}.png`} alt="image.png" />
        </BorderFrame>
      ))}
    </div>
  );
};
Presets.displayName = "Presets";

export default Presets;
