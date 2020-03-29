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
      name: "withRandomPosition",
      label: "Randomize Position",
      type: ConfigFieldType.RandomnessInput,
      strengthConfigFieldName: "randomizePositionStrength",
      defaultValue: false
    },
    {
      type: ConfigFieldType.Hidden,
      name: "randomizePositionStrength",
      defaultValue: 10,
      minValue: 30,
      maxValue: 100
    }
  ],
  generate: (width, height, configValues) => {
    const {
      withRandomPosition,
      randomizePositionStrength,
      objectDistance
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
        items.push({ top, left });
      }
    }
    return items;
  }
} as Layout;
