import random from "lodash.random";
import { ConfigFieldType, Layout } from "../types";
import { beforeBooleans, beforeAll } from "./_shared";

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
    ...beforeBooleans
  ],
  generate: (width, height, configValues) => {
    const { objectDistance } = configValues;

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

        items.push({ top, left });
      }
    }

    return items;
  }
} as Layout;
