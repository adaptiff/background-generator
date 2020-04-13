import { ConfigFieldType } from "../types";
import { beforeAll, beforeBooleans, afterAll } from "./_shared";
import { deg2rad, rotateItemCoords } from "../utils";

export default {
  id: 4,
  src: "/layout_thumbs/4.png",
  configFields: [
    ...beforeAll,
    {
      name: "itemMargin",
      label: "Item Margin",
      type: ConfigFieldType.NumberInput,
      defaultValue: 70,
      minValue: 10,
      maxValue: 100
    },
    {
      name: "figureMargin",
      label: "Figure Margin",
      type: ConfigFieldType.NumberInput,
      defaultValue: 20,
      minValue: 1,
      maxValue: 100
    },
    {
      name: "figureRotate",
      label: "Figure Rotate",
      type: ConfigFieldType.NumberInput,
      defaultValue: 180,
      minValue: 0,
      maxValue: 360
    },
    {
      name: "figureAngles",
      label: "Num. of Angles",
      type: ConfigFieldType.NumberInput,
      defaultValue: 3,
      minValue: 3,
      maxValue: 10
    },
    {
      name: "sizeDecrement",
      label: "Size Decrement %",
      type: ConfigFieldType.NumberInput,
      defaultValue: 10,
      minValue: 1,
      maxValue: 100
    },
    ...beforeBooleans,
    ...afterAll
  ],
  generate: (width, height, configValues) => {
    const {
      itemMargin, //расстояние между итемами на окружности

      figureAngles, //кол-во углов фигуры
      figureMargin, //отступы между слоями фигуры
      figureRotate, //угол поворота фигуры

      fillType //cover - по большей стороне, contain - по меньшей стороне
    } = configValues;

    const itemWidth = configValues.objectSize;
    const itemHeight = configValues.objectSize;

    const itemSizeIncrement = -(configValues.sizeDecrement / 100);

    //const figureInnerAngle = (180 * (figureAngles - 2)) / figureAngles;
    const figureCenterAngle = 360 / figureAngles;
    const figureHalfSectorTg = Math.tan(deg2rad(figureCenterAngle / 2));
    const figureHalfSectorCos = Math.cos(deg2rad(figureCenterAngle / 2));

    //определяем большую и меньшую стороны
    let bigSide = width;
    let smallSide = height;
    if (width < height) {
      bigSide = height;
      smallSide = width;
    }

    //сторона до длинны которой будут генериться фигуры
    const fillSide = fillType === "cover" ? bigSide : smallSide;

    let squareRadius = fillSide / 2;

    //центр холста
    const areaCenterPoint = { left: width / 2, top: height / 2 };

    //если фигура горизонтально не симетричная
    //(каждая фигура с нечетным кол-вом углов)
    //то смещаем ее центр с учетом поворота и высчитываем размеры меньшего радиуса
    if (figureAngles % 2 != 0 && fillType !== "cover") {
      const radiusCoef = 1 / figureHalfSectorCos;
      const smallRadius = fillSide / (1 + radiusCoef);
      const bigRadius = smallRadius * radiusCoef;
      const radiusDiff = bigRadius - smallRadius;

      squareRadius = smallRadius;

      //вращение на угол сектора принимаем за вращение на 360
      const rotatePercent = (360 * figureRotate) / figureCenterAngle;
      const topDiff = (radiusDiff / 2) * Math.cos(deg2rad(rotatePercent));

      areaCenterPoint.top = height / 2 + topDiff;
    }

    //текущее смещение по вертикали относительно центра
    let figureSmallRadius = 0;

    //текущий коэфециент размера итема
    let itemsSizeIncrement = 1;

    let items = [];
    while (figureSmallRadius < squareRadius) {
      const figureSide = figureSmallRadius * figureHalfSectorTg * 2;

      let itemsOnSide = Math.round(figureSide / itemMargin);
      const correctItemsMargin = figureSide / itemsOnSide;

      //центральная точка
      if (figureSmallRadius === 0) {
        items.push({
          left: areaCenterPoint.left,
          top: areaCenterPoint.top,
          width: itemWidth,
          height: itemHeight
        });
      }

      let itemIndex = 0;
      while (itemIndex < itemsOnSide) {
        const currentItemMargin = itemIndex * correctItemsMargin;
        let partRotateAngle = 0;
        for (let i = 0; i < figureAngles; i++) {
          let item = {
            left: areaCenterPoint.left + currentItemMargin - figureSide / 2,
            top: areaCenterPoint.top + figureSmallRadius,
            width: itemWidth * itemsSizeIncrement,
            height: itemHeight * itemsSizeIncrement
          };

          if (partRotateAngle) {
            item = rotateItemCoords(item, areaCenterPoint, partRotateAngle);
          }

          if (figureRotate) {
            item = rotateItemCoords(item, areaCenterPoint, figureRotate);
          }

          items.push(item);
          partRotateAngle += figureCenterAngle;
        }
        itemIndex++;
      }

      itemsSizeIncrement = itemsSizeIncrement + itemSizeIncrement;
      if (itemsSizeIncrement <= 0) {
        return items;
      }

      figureSmallRadius += figureMargin;
    }

    return items;
  }
};
