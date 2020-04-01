import React, { useEffect, useRef } from "react";
import Head from "next/head";
import throttle from "lodash.throttle";
import random from "lodash.random";
import layouts from "../../layouts";
import objects from "../../objects";
import { ImageObject } from "../../types";
import { applyColorToFabricElement, getScaleToFullyFit } from "../../utils";

import s from "./Canvas.less";

export interface Props {
  width: number;
  height: number;
  configValues: any;
  configColors: any;
  selectedObjectIds: number[];
  selectedLayoutId: number;
  uploadedObjects: ImageObject[];
}

export const Canvas: React.FC<Props> = ({
  width,
  height,
  configValues,
  configColors,
  selectedObjectIds,
  selectedLayoutId,
  uploadedObjects
}) => {
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(
    () => initFabric({ width, height, canvasContainer, configColors }),
    [width, height, canvasContainer]
  );

  useEffect(() => {
    redrawCanvas({
      width,
      height,
      configColors,
      configValues,
      selectedObjectIds,
      selectedLayoutId,
      uploadedObjects
    });
  }, [
    width,
    height,
    configColors,
    configValues,
    selectedObjectIds,
    selectedLayoutId,
    uploadedObjects
  ]);

  return (
    <>
      <Head>
        {/*<script src="https://unpkg.com/fabric@3.6.2/dist/fabric.min.js" />*/}
        <script src="/fabric.js" />
      </Head>
      <div
        id="canvas-container"
        className={s["canvas-container"]}
        ref={canvasContainer}
      />
    </>
  );
};
Canvas.displayName = "Canvas";

let prevConfigValues;

const loadedFabricObjects = {};
let loadedFabricObjectsCount = 0;

const initFabric = ({ width, height, canvasContainer, configColors }) => {
  const containerRect = canvasContainer.current.getBoundingClientRect();

  const scaleToFit = getScaleToFullyFit({
    width,
    height,
    maxWidth: containerRect.width - 70 * 2,
    maxHeight: containerRect.height - 70 * 2
  });

  canvasContainer.current.innerHTML = `<div id="canvas-scale-wrapper"><canvas id="canvas"></canvas></div>`;
  canvasContainer.current.firstChild.style.transform = `scale(${scaleToFit})`;

  const fabricCanvas = new window["fabric"].Canvas("canvas");
  window["fabricCanvas"] = fabricCanvas;
  fabricCanvas.setWidth(width);
  fabricCanvas.setHeight(height);
  const rect = new window["fabric"].Rect({
    width,
    height,
    left: 0,
    top: 0,
    selectable: false,
    hoverCursor: "default"
  });
  applyColorToFabricElement(configColors.backgroundColor, rect);

  window["rect"] = rect;
  fabricCanvas.add(rect);
};

const redrawCanvas = throttle(
  ({
    width,
    height,
    configColors,
    configValues,
    selectedObjectIds,
    selectedLayoutId,
    uploadedObjects
  }) => {
    if (!window || !window["fabric"]) {
      return null;
    }

    applyColorToFabricElement(configColors.backgroundColor, window["rect"]);

    const selectedObjects = selectedObjectIds.map(id =>
      [...uploadedObjects, ...objects].find(item => item.id === id)
    );

    const addLayoutItems = () => {
      const paddingX = width * (configValues.padding / 100);
      const paddingY = height * (configValues.padding / 100);

      const layout = layouts.find(l => l.id === selectedLayoutId);
      const layoutItems = layout.generate(
        width - 2 * paddingX,
        height - 2 * paddingY,
        configValues
      );

      let currentColorIndex = 0;
      let currentObjectIndex = 0;
      window["objects"] = [];
      layoutItems.forEach(item =>
        loadedFabricObjects[selectedObjects[currentObjectIndex].id].clone(
          (function(width, height, top, left, angle, blur) {
            return function(clone) {
              let itemWidth = width || configValues.objectSize;

              clone.scaleToWidth(itemWidth);
              clone.set({
                left: paddingX + left,
                top: paddingY + top,
                angle: angle || 0,
                blur: blur,
                originX: "center",
                originY: "center"
              });

              applyColorToFabricElement(
                configColors.objectColors[currentColorIndex],
                clone
              );

              window["objects"].push(clone);
              window["fabricCanvas"] && window["fabricCanvas"].add(clone);

              if (selectedObjects.length > 0) {
                if (configValues.withRandomObjectOrder) {
                  currentObjectIndex = random(0, selectedObjects.length - 1);
                } else {
                  currentObjectIndex++;
                  if (currentObjectIndex > selectedObjects.length - 1) {
                    currentObjectIndex = 0;
                  }
                }
              }

              if (configColors.objectColors.length > 0) {
                if (configValues.withRandomColor) {
                  currentColorIndex = random(
                    0,
                    configColors.objectColors.length - 1
                  );
                } else {
                  currentColorIndex++;
                  if (
                    currentColorIndex >
                    configColors.objectColors.length - 1
                  ) {
                    currentColorIndex = 0;
                  }
                }
              }
            };
          })(
            item.width,
            item.height,
            item.top,
            item.left,
            item.angle,
            item.blur
          )
        )
      );
    };

    const renderAll = () => {
      window["fabricCanvas"] && window["fabricCanvas"].renderAll();
    };

    const removeAllObjects = () => {
      window["objects"] &&
        window["objects"].forEach(object => {
          window["fabricCanvas"].remove(object);
        });
    };

    if (
      prevConfigValues &&
      (configValues.objectDistance !== prevConfigValues.objectDistance ||
        configValues.objectSize !== prevConfigValues.objectSize)
    ) {
      removeAllObjects();
      addLayoutItems();
      renderAll();
      prevConfigValues = configValues;
      return;
    }

    prevConfigValues = configValues;

    loadedFabricObjectsCount = 0;
    selectedObjects.map(selectedObject => {
      if (selectedObject.type?.includes("svg")) {
        window["fabric"].loadSVGFromURL(selectedObject.src, function(
          objects,
          options
        ) {
          const obj = window["fabric"].util.groupSVGElements(objects, options);

          addObjectToLoaded(selectedObject.id, obj);
        });
      } else {
        window["fabric"].Image.fromURL(selectedObject.src, function(img) {
          addObjectToLoaded(selectedObject.id, img);
        });
      }
    });
    const addObjectToLoaded = (id, obj) => {
      loadedFabricObjects[id] = obj;
      loadedFabricObjectsCount++;
      if (loadedFabricObjectsCount === selectedObjects.length) {
        removeAllObjects();
        addLayoutItems();
        renderAll();
      }
    };
  },
  100,
  { traling: true }
);

export default Canvas;
