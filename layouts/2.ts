import random from "lodash.random";
import { ConfigFieldType, Layout } from "../types";
import { beforeAll, beforeBooleans, afterAll } from "./_shared";

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
      defaultValue: false,
      withRandomness: true
    },
    {
      type: ConfigFieldType.Hidden,
      name: "randomizeSizeStrength",
      defaultValue: 4,
      minValue: 1,
      step: 0.1,
      maxValue: 20
    },
    {
      name: "withRotation",
      label: "Rotate Objects",
      type: ConfigFieldType.BoolWithNumberInput,
      strengthConfigFieldName: "rotationStrength",
      withRandomness: false,
      defaultValue: false
    },
    {
      type: ConfigFieldType.Hidden,
      name: "rotationStrength",
      defaultValue: 45,
      minValue: 0,
      maxValue: 360
    },
    ...afterAll
  ],
  generate: (width, height, configValues) => {
    const {
      columnCount,
      rowCount,
      objectSize,
      withRandomSize,
      randomizeSizeStrength,
      withRotation,
      rotationStrength
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
        let angle = 0;
        if (withRotation) {
          angle = rotationStrength;
        }
        items.push({ top, left, width, height, angle });
      }
    }

    return items;
  }
} as Layout;
