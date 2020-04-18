import random from "lodash.random";
import { ConfigFieldType, Layout } from "../types";
import { beforeBooleans, beforeAll, afterAll } from "./_shared";

export default {
  id: 7,
  src: "/layout_thumbs/7.png",
  configFields: [
    ...beforeAll,
    {
      name: "objectDistance",
      label: "Object Distance",
      type: ConfigFieldType.NumberInput,
      defaultValue: 50,
      minValue: 30,
      maxValue: 100
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
      objectDistance,
      objectSize,
      withRandomSize,
      randomizeSizeStrength,
      withRotation,
      rotationStrength
    } = configValues;

    const objectCountX = Math.floor(width / objectDistance);
    const objectCountY = Math.floor(height / objectDistance);

    if (objectCountX <= 0 || objectCountY <= 0) {
      return [];
    }

    const distanceX = width / objectCountX;
    const distanceY = width / objectCountY;

    const items = [];
    for (let j = 0; j <= objectCountY; j++) {
      let rowObjectCountX = objectCountX;
      let startXPosition = 0;

      if (j % 2) {
        rowObjectCountX = objectCountX - 1;
        startXPosition += distanceX / 2;
      }

      for (let i = 0; i <= rowObjectCountX; i++) {
        const left = Math.floor(i * distanceX + startXPosition);
        const top = Math.floor(j * distanceY);
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
