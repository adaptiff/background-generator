import random from "lodash.random";
import { ConfigFieldType } from "../types";
import { beforeAll, beforeBooleans } from "./_shared";

export default {
  id: 5,
  src: "/layout_thumbs/5.png",
  configFields: [
    ...beforeAll,
    {
      name: "explosionForce",
      label: "Explosion Force",
      type: ConfigFieldType.NumberInput,
      defaultValue: 20,
      minValue: 0,
      maxValue: 100
    },
    {
      name: "cellWidth",
      label: "Cell Width",
      type: ConfigFieldType.NumberInput,
      defaultValue: 78,
      minValue: 25,
      maxValue: 500
    },
    {
      name: "cellPadding",
      label: "Cell Padding",
      type: ConfigFieldType.NumberInput,
      defaultValue: 10,
      minValue: 0,
      maxValue: 250
    },
    {
      name: "maxScale",
      label: "Max Scale",
      type: ConfigFieldType.NumberInput,
      defaultValue: 4,
      minValue: 1,
      maxValue: 20,
      step: 0.1
    },
    {
      name: "withRotate",
      label: "Rotate Objects",
      type: ConfigFieldType.RandomnessInput,
      defaultValue: false
    },
    {
      name: "withBlur",
      label: "Blur Objects",
      type: ConfigFieldType.RandomnessInput,
      defaultValue: false
    },
    ...beforeBooleans
  ],
  generate(width, height, configValues) {
    const {
      maxScale, // пределы скейлинга
      cellWidth, //ширина ячейки
      withRotate, //вращать итемы или нет
      withBlur //blur
    } = configValues;

    const explosionForce = (width * configValues.explosionForce) / 100 / 2;
    const itemWidth = configValues.objectSize;
    const itemHeight = configValues.objectSize;
    const cellPadding = Math.min(cellWidth / 2, configValues.cellPadding); //отступ у ячейки

    //центр холста
    const areaCenterPoint = { left: width / 2, top: height / 2 };
    const cellsQty = Math.ceil(width / cellWidth) + 1;
    const rowsQty = Math.ceil(height / cellWidth) + 1;

    const explosionCenter = areaCenterPoint;

    const items = [];
    for (let rowIndex = 0; rowIndex < rowsQty; rowIndex++) {
      //top-координата текущей ячейки
      const cellTop = rowIndex * cellWidth - cellWidth / 2;

      for (let cellIndex = 0; cellIndex < cellsQty; cellIndex++) {
        const item = {
          left: 0,
          top: 0,
          width: itemWidth,
          height: itemHeight,
          angle: 0,
          blur: 0
        };

        //left-координата текущей ячейки
        const cellLeft = cellIndex * cellWidth - cellWidth / 2;

        //рандомный left в пределах ячейки с учетом padding'а
        const randLeft = random(cellPadding, cellWidth - cellPadding, true);
        item.left = cellLeft + randLeft;

        //рандомный top в пределах ячейки с учетом padding'а
        const randTop = random(cellPadding, cellWidth - cellPadding, true);
        item.top = cellTop + randTop;

        //исключаем частицы за пределами области отрисовки
        if (
          item.top > width + itemWidth ||
          item.top < -itemWidth ||
          item.left > width + itemWidth ||
          item.left < -itemWidth
        ) {
          continue;
        }

        const scale = random(1, maxScale, true);
        item.width *= scale;
        item.height *= scale;

        item.angle = withRotate ? random(0, 360, true) : 0;
        item.blur = withBlur ? random(0, 10) : 0;

        if (item.blur < 2) {
          item.blur = 0;
        }

        const leftFromCenter = item.left - explosionCenter.left;
        const topFromCenter = item.top - explosionCenter.top;
        const distanceToCenter = Math.sqrt(
          Math.pow(Math.abs(leftFromCenter), 2) +
            Math.pow(Math.abs(topFromCenter), 2)
        );

        const angleRads = Math.atan2(topFromCenter, leftFromCenter);
        const explosionVector = {
          left: Math.cos(angleRads) * explosionForce,
          top: Math.sin(angleRads) * explosionForce
        };

        const itemExplosionVector = {
          left: explosionVector.left / (distanceToCenter / 100),
          top: explosionVector.top / (distanceToCenter / 100)
        };

        item.left += itemExplosionVector.left;
        item.top += itemExplosionVector.top;

        items.push(item);
      }
    }

    return items;
  }
};
