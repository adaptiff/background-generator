import {ConfigFieldType, Layout} from "../types";
import {beforeAll, beforeBooleans} from "./_shared";
import {deg2rad} from "../utils";

export default {
    id: 6,
    src: "/layout_thumbs/6.png",
    configFields: [
        ...beforeAll,
        {
            name: "itemsMargin",
            label: "Item Margin",
            type: ConfigFieldType.NumberInput,
            defaultValue: 20,
            minValue: 10,
            maxValue: 100
        },
        ...beforeBooleans
    ],
    generate(width, height, configValues) {
        const {
            itemsMargin, //расстояние между итемами на окружности,
            fillType = 'contain'
        } = configValues;

        const baseWidth = configValues.objectSize;
        const baseHeight = configValues.objectSize;


        //определяем большую и меньшую стороны
        let bigSide = width;
        let smallSide = height;
        if (width < height) {
            bigSide = height;
            smallSide = width;
        }

        //сторона до длинны которой будут генериться окружности
        const fillSide = fillType === 'cover' ? bigSide : smallSide;

        //центр холста
        const areaCenterPoint = {left: width / 2, top: height / 2};

        //радиус окружности
        const circleRadius = fillSide / 2;

        //текущее смещение по вертикали относительно центра окружности
        let topItemsOffset = 0;

        const items = [];
        while (topItemsOffset < circleRadius) {
            //текущее смещение по горизонтали относительно центра окружности
            let leftItemsOffset = 0;

            while (leftItemsOffset < circleRadius) {
                const itemPointRadius = Math.sqrt(Math.pow(leftItemsOffset, 2) + Math.pow(topItemsOffset, 2));
                const radiusProgress = 1 - itemPointRadius / circleRadius; //от 1 до 0

                if (itemPointRadius > circleRadius) {
                    break;
                }

                const coordsModifiers = [
                    [1, 1], //правый нижний угол
                    [1, -1], //правый верхний угол
                    [-1, -1], //левый верхний угол
                    [-1, 1]  //левый нижний угол
                ];

                for (let i = 0; i < 4; i++) {
                    let _leftItemsOffset = leftItemsOffset;
                    let _topItemsOffset = topItemsOffset;

                    if (leftItemsOffset > 0) {
                        _leftItemsOffset *= coordsModifiers[i][0];
                    }

                    if (topItemsOffset > 0) {
                        _topItemsOffset *= coordsModifiers[i][1];
                    }

                    items.push({
                        left: areaCenterPoint.left + _leftItemsOffset,
                        top: areaCenterPoint.top + _topItemsOffset,
                        width: Math.max(baseWidth * radiusProgress, 1),
                        height: Math.max(baseHeight * radiusProgress, 1),
                    });
                }

                leftItemsOffset += itemsMargin;
            }

            topItemsOffset += itemsMargin;
        }

        return items;
    }
} as Layout;
