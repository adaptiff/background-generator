import random from "lodash.random";
import { ConfigFieldType, Layout } from "../types";
import { beforeBooleans, beforeAll } from "./_shared";

export default {
  id: 1,
  src: "/layout_thumbs/1.png",
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
      defaultValue: false
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
      name: "withRandomPosition",
      label: "Randomize Position",
      type: ConfigFieldType.BoolWithNumberInput,
      strengthConfigFieldName: "randomizePositionStrength",
      defaultValue: false
    },
    {
      type: ConfigFieldType.Hidden,
      name: "randomizePositionStrength",
      defaultValue: 10,
      minValue: 1,
      maxValue: 100
    },
    {
      name: "withRotation",
      label: "Rotate Objects",
      type: ConfigFieldType.BoolWithNumberInput,
      strengthConfigFieldName: "rotationStrength",
      withRefresh: false,
      defaultValue: false
    },
    {
      type: ConfigFieldType.Hidden,
      name: "rotationStrength",
      defaultValue: 45,
      minValue: 0,
      maxValue: 360
    },
    {
      name: "withRandomRotation",
      label: "Rotate Objects Randomly",
      type: ConfigFieldType.BoolWithNumberInput,
      defaultValue: false
    },
    {
      name: "withBlur",
      label: "Blur Objects",
      type: ConfigFieldType.BoolWithNumberInput,
      strengthConfigFieldName: "blurStrength",
      withRefresh: false,
      defaultValue: false
    },
    {
      type: ConfigFieldType.Hidden,
      name: "blurStrength",
      defaultValue: 5,
      minValue: 1,
      maxValue: 30
    }
  ],
  generate: (width, height, configValues) => {
    const {
      withRandomSize,
      randomizeSizeStrength,
      withRandomPosition,
      withRotation,
      rotationStrength,
      withRandomRotation,
      randomizePositionStrength,
      objectDistance,
      objectSize,
      withBlur,
      blurStrength
    } = configValues;

    const objectCountX = Math.floor(width / objectDistance);
    const objectCountY = Math.floor(height / objectDistance);

    if (objectCountX <= 0 || objectCountY <= 0) {
      return [];
    }

    const distanceX = objectDistance + (width % objectDistance) / objectCountX;
    const distanceY = objectDistance + (height % objectDistance) / objectCountY;

    const randPower = withRandomPosition ? randomizePositionStrength / 10 : 0;

    const items = [];
    for (let i = 0; i <= width + distanceX / 2; i += distanceX) {
      for (let j = 0; j <= height + distanceY / 2; j += distanceY) {
        const left = Math.floor(
          i + (random(0, distanceX) - distanceX / 2) * randPower
        );
        const top = Math.floor(
          j + (random(0, distanceY) - distanceY / 2) * randPower
        );
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
        if (withRandomRotation) {
          angle = random(0, 360, true);
        }
        let blur = 0;
        if (withBlur) {
          blur = blurStrength;
        }
        items.push({ top, left, width, height, angle, blur });
      }
    }
    return items;
  }
} as Layout;
