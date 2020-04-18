import React, { useEffect, useRef } from "react";
import Head from "next/head";
import throttle from "lodash.throttle";
import random from "lodash.random";
import layouts from "../../layouts";
import objects from "../../objects";
import { ImageObject } from "../../types";
import { applyColorToFabricElement, getScaleToFullyFit } from "../../utils";

import s from "./Canvas.less";

let loadedObjects = {};
let layoutItems = [];
let fabricObjects = [];
let canvasBackgroundRect;

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

  const selectedObjects = selectedObjectIds.map(id =>
    [...uploadedObjects, ...objects].find(item => item.id === id)
  );

  //componentDidMount
  useEffect(() => {
    const handleClickOutside = e => {
      const canvas = window["fabricCanvas"].upperCanvasEl;
      const clickedInside = canvas === e.target;

      if (!clickedInside) {
        window["fabricCanvas"].discardActiveObject();
        renderAll();
      }
    };

    document.addEventListener("click", handleClickOutside);

    //componentWillUnmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    initFabric({ width, height, canvasContainer, configColors });
  }, [width, height, canvasContainer]);

  useEffect(() => {
    loadObjectsThrottle(selectedObjects, configValues, configColors);
  }, [
    width,
    height,
    uploadedObjects,
    selectedObjectIds,
    configValues.withRandomObjectOrder,
    configValues.currentRandomSnapshot
  ]);

  useEffect(() => {
    calcAndDrawLayoutThrottle(
      width,
      height,
      configValues,
      selectedLayoutId,
      selectedObjects,
      configColors
    );
  }, [width, height, configValues, selectedLayoutId]);

  useEffect(() => {
    setColorsThrottle(configColors, configValues);
  }, [
    configColors,
    configValues.withRandomColor,
    configValues.currentRandomSnapshot
  ]);

  return (
    <>
      <Head>
        <script src="/fabric.min.js" />
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

/*****************************************************************
 * Throttle Functions
 ****************************************************************/
const setColorsThrottle = throttle(
  (configColors, configValues) => {
    setColors(configColors, configValues.withRandomColor);
    renderAll();
  },
  100,
  { trailing: true }
);

const calcAndDrawLayoutThrottle = throttle(
  (
    width,
    height,
    configValues,
    selectedLayoutId,
    selectedObjects,
    configColors
  ) => {
    calcLayout(width, height, configValues, selectedLayoutId);
    drawLayout(selectedObjects, configValues, configColors);
  },
  100,
  { trailing: true }
);

const loadObjectsThrottle = throttle(
  (selectedObjects, configValues, configColors) => {
    loadObjects(selectedObjects, () => {
      drawLayout(selectedObjects, configValues, configColors);
    });
  },
  100,
  { trailing: true }
);

/*****************************************************************
 * Init Fabric
 ****************************************************************/
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
  fabricCanvas.renderOnAddRemove = false;
  fabricCanvas.skipOffscreen = false;
  canvasBackgroundRect = new window["fabric"].Rect({
    width,
    height,
    left: 0,
    top: 0,
    selectable: false,
    hoverCursor: "default"
  });
  applyColorToFabricElement(configColors.backgroundColor, canvasBackgroundRect);

  fabricCanvas.add(canvasBackgroundRect);

  loadedObjects = {};
  layoutItems = [];
  fabricObjects = [];
};

/*****************************************************************
 * Change Colors
 ****************************************************************/
function setColors(configColors, withRandomColor) {
  applyColorToFabricElement(configColors.backgroundColor, canvasBackgroundRect);

  fabricObjects.forEach((fabricObject, index) => {
    setCurrentColor(fabricObject, index, configColors, withRandomColor);
  });
}

function setCurrentColor(fabricObject, index, configColors, withRandomColor) {
  let currentColorIndex = 0;

  if (withRandomColor) {
    currentColorIndex = random(0, configColors.objectColors.length - 1);
  } else {
    currentColorIndex = index % configColors.objectColors.length;
  }

  applyColorToFabricElement(
    configColors.objectColors[currentColorIndex],
    fabricObject
  );
}

/*****************************************************************
 * Load Objects
 ****************************************************************/
function loadObjects(selectedObjects, callback) {
  let loadedObjectsCount = 0;

  selectedObjects.forEach(selectedObject => {
    if (selectedObject.type?.includes("image")) {
      if (selectedObject.type?.includes("svg")) {
        createObjectFromSvg(selectedObject);
      } else {
        createObjectFromImage(selectedObject);
      }
    }

    if (["emoji", "text"].includes(selectedObject.type)) {
      createObjectFromText(selectedObject);
    }
  });

  function createObjectFromSvg(object) {
    window["fabric"].loadSVGFromURL(object.src, function(svgParts, options) {
      loadedObjects[object.id] = window["fabric"].util.groupSVGElements(
        svgParts,
        options
      );

      loadedObjects[object.id].set({
        originX: "center",
        originY: "center"
      });

      if (++loadedObjectsCount === selectedObjects.length && callback) {
        afterObjectsLoaded();
      }
    });
  }

  function createObjectFromImage(object) {
    window["fabric"].Image.fromURL(object.src, function(img) {
      img.set({
        originX: "center",
        originY: "center"
      });

      loadedObjects[object.id] = img;

      if (++loadedObjectsCount === selectedObjects.length && callback) {
        afterObjectsLoaded();
      }
    });
  }

  function createObjectFromText(object) {
    var text = new window["fabric"].Text(object.src, {
      originX: "center",
      originY: "center"
    });

    loadedObjects[object.id] = text;

    if (++loadedObjectsCount === selectedObjects.length && callback) {
      afterObjectsLoaded();
    }
  }

  function afterObjectsLoaded() {
    removeAllObjects();
    callback();
  }
}

/*****************************************************************
 * Draw Layout
 ****************************************************************/
function drawLayout(selectedObjects, configValues, configColors) {
  window["fabricCanvas"].discardActiveObject();

  //Delete remaining fabric objects
  if (fabricObjects.length > layoutItems.length) {
    const removedFabricObjects = fabricObjects.splice(
      layoutItems.length,
      fabricObjects.length - layoutItems.length
    );
    removedFabricObjects.forEach(fabricObject => {
      window["fabricCanvas"].remove(fabricObject);
    });
  }

  //Create additional fabric objects
  createObjects(fabricObjects.length, layoutItems.length, function() {
    //Set for all fabric objects props from layout
    setObjectsProps();
    renderAll();
  });

  function setPropsFromLayoutItem(fabricObject, item) {
    let itemWidth = item.width || configValues.objectSize;

    fabricObject.set({
      left: item.left,
      top: item.top,
      blur: fabricObject.origBlur + item.blur,
      angle: item.angle || 0,
      scaleX: itemWidth / fabricObject.width,
      scaleY: itemWidth / fabricObject.width
    });


    fabricObject.setCoords();
    fabricObject.dirty = true;

    return fabricObject;
  }

  function getCurrentLoadedObject(itemIndex) {
    let currentObjectIndex = 0;

    if (configValues.withRandomObjectOrder) {
      currentObjectIndex = random(0, selectedObjects.length - 1);
    } else {
      currentObjectIndex = itemIndex % selectedObjects.length;
    }

    if (!selectedObjects[currentObjectIndex]) {
      return false;
    }

    if (!loadedObjects[selectedObjects[currentObjectIndex].id]) {
      return false;
    }

    return loadedObjects[selectedObjects[currentObjectIndex].id];
  }

  function createObject(itemIndex, callback) {
    const currentLoadedObject = getCurrentLoadedObject(itemIndex);

    callback = callback || function() {};

    if (!currentLoadedObject) {
      return false;
    }

    //clone loaded object and add on canvas
    currentLoadedObject.clone(clonedLoadedObject => {
      setCurrentColor(
        clonedLoadedObject,
        itemIndex,
        configColors,
        configValues.withRandomColor
      );
      fabricObjects[itemIndex] = clonedLoadedObject;
      window["fabricCanvas"] && window["fabricCanvas"].add(clonedLoadedObject);
      callback(itemIndex);
    }, ['blur', 'origBlur']);

    return true;
  }

  function createObjects(startIndex, endIndex, callback) {
    let created = 0;
    callback = callback || function() {};
    if (startIndex == endIndex) {
      callback();
      return;
    }

    for (let index = startIndex; index < endIndex; index++) {
      createObject(index, function(itemIndex) {
        created++;
        if (created === endIndex - startIndex) {
          callback();
        }
      });
    }
  }

  function setObjectsProps() {
    layoutItems.forEach(function(layoutItem, index) {
      setPropsFromLayoutItem(fabricObjects[index], layoutItem);
    });
  }
}

/*****************************************************************
 * Calc Layout Items Positions
 ****************************************************************/
function calcLayout(width, height, configValues, selectedLayoutId) {
  const paddingX = width * (configValues.padding / 100);
  const paddingY = height * (configValues.padding / 100);

  const layout = layouts.find(l => l.id === selectedLayoutId);
  layoutItems = layout.generate(
    width - 2 * paddingX,
    height - 2 * paddingY,
    configValues
  );

  layoutItems.forEach(item => {
    if (item.width) {
      item.width = Math.max(item.width, 1);
    }
    item.left += paddingX;
    item.top += paddingY;
  });
}

/*****************************************************************
 * Canvas Helpers
 ****************************************************************/
function renderAll() {
  window["fabricCanvas"] && window["fabricCanvas"].renderAll();
}

function removeAllObjects() {
  //delete all except first object (background)
  window["fabricCanvas"]._objects.splice(
    1,
    window["fabricCanvas"]._objects.length
  );
  fabricObjects = [];
}

export default Canvas;
