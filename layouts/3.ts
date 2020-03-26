import { ConfigFieldType, Layout } from "../types";
import { beforeAll, beforeBooleans } from "./_shared";
import { deg2rad } from "../utils";

export default {
  id: 3,
  src: "/layout_thumbs/3.png",
  configFields: [
    ...beforeAll,
    {
      name: "itemsMargin",
      label: "Item Margin",
      type: ConfigFieldType.NumberInput,
      defaultValue: 20,
      minValue: 1,
      maxValue: 100
    },
    {
      name: "circlesMargin",
      label: "Circle Margin",
      type: ConfigFieldType.NumberInput,
      defaultValue: 20,
      minValue: 1,
      maxValue: 100
    },
    {
      name: "sizeDecrement",
      label: "Size Decrement %",
      type: ConfigFieldType.NumberInput,
      defaultValue: 10,
      minValue: 1,
      maxValue: 100
    },
    ...beforeBooleans
  ],
  generate: (width, height, configValues) => {
    const {
      itemsMargin, //расстояние между итемами на окружности
      circlesMargin, //расстояние между окружностями
      fillType = "contain" //cover - по большей стороне, contain - по меньшей стороне
    } = configValues;

    const baseWidth = configValues.objectSize;
    const baseHeight = configValues.objectSize;

    const sizeIncrement = -(configValues.sizeDecrement / 100);

    //определяем большую и меньшую стороны
    let bigSide = width;
    let smallSide = height;
    if (width < height) {
      bigSide = height;
      smallSide = width;
    }

    //сторона до длинны которой будут генериться окружности
    const fillSide = fillType === "cover" ? bigSide : smallSide;

    //центр холста
    const areaCenterPoint = { left: width / 2, top: height / 2 };

    //радиус окружности
    let circleRadius = 0;

    //длина окружности
    let circleLength = 2 * Math.PI * circleRadius;

    //текущий коээфициент размера итема
    let itemSizeIncrement = 1;

    const items = [];
    while (circleRadius * 2 < fillSide) {
      //смещение текущего итема по линии окружности
      let itemCirclePosition = 0;

      //угол поворота центра итема по окружности
      let angle = 0;

      const itemsQty = Math.floor(circleLength / itemsMargin);
      let itemIndex = 0;

      do {
        if (circleRadius) {
          angle = (itemCirclePosition * 180) / (Math.PI * circleRadius);
        }

        items.push({
          left: areaCenterPoint.left + circleRadius * Math.cos(deg2rad(angle)),
          top: areaCenterPoint.top + circleRadius * Math.sin(deg2rad(angle)),
          width: baseWidth * itemSizeIncrement,
          height: baseHeight * itemSizeIncrement
        });

        itemIndex++;
        itemCirclePosition = (circleLength / itemsQty) * itemIndex;
      } while (itemIndex < itemsQty);

      circleRadius += circlesMargin;
      circleLength = 2 * Math.PI * circleRadius;
      itemSizeIncrement += sizeIncrement;

      if (itemSizeIncrement <= 0) {
        return items;
      }
    }

    return items;
  }
} as Layout;
