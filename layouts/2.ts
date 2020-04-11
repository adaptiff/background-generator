import random from "lodash.random";
import { ConfigFieldType, Layout } from "../types";
import { beforeAll, beforeBooleans } from "./_shared";

export default {
  id: 2,
  src: "/layout_thumbs/2.png",
  configFields: [
    ...beforeAll,
    {
      name: "columnCount",
      label: "Column Count",
      type: ConfigFieldType.NumberInput,
      defaultValue: 7,
      minValue: 1,
      maxValue: 50
    },
    {
      name: "rowCount",
      label: "Row Count",
      type: ConfigFieldType.NumberInput,
      defaultValue: 3,
      minValue: 1,
      maxValue: 50
    },
    ...beforeBooleans,
    {
      name: "withRandomSize",
      label: "Randomize Object Size",
      type: ConfigFieldType.BoolWithNumberInput,
      strengthConfigFieldName: "randomizeSizeStrength",
      defaultValue: false
    },
    {
      type: ConfigFieldType.Hidden,
      name: "randomizeSizeStrength",
      defaultValue: 4,
      minValue: 1,
      step: 0.1,
      maxValue: 20
    }
  ],
  generate: (width, height, configValues) => {
    const {
      columnCount,
      rowCount,
      objectSize,
      withRandomSize,
      randomizeSizeStrength
    } = configValues;

    const px = width / columnCount;
    const py = height / rowCount;
    const items = [];
    for (let i = 0; i <= columnCount; i++) {
      for (let j = 0; j <= rowCount; j++) {
        const top = j * py;
        const left = i * px;
        let width = objectSize;
        let height = objectSize;
        if (withRandomSize) {
          const scale = random(1, randomizeSizeStrength, true);
          width *= scale;
          height *= scale;
        }
        items.push({ top, left, width, height });
      }
    }

    return items;
  }
} as Layout;
