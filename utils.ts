import { FillType } from "./types";
import layouts from "./layouts";

export const getDefaultConfigValues = layoutId => {
  const layout = layouts.find(layout => layout.id === layoutId);
  const configValues = {};
  layout.configFields.forEach(configField => {
    configValues[configField.name] = configField.defaultValue;
  });
  return configValues;
};

export const deg2rad = angle => {
  return angle * (Math.PI / 180);
};

export const rotateItemCoords = (item, origin, angle) => {
  const rads = deg2rad(angle);
  const coords: any = {};

  coords.left =
    Math.cos(rads) * (item.left - origin.left) -
    Math.sin(rads) * (item.top - origin.top) +
    origin.left;
  coords.top =
    Math.sin(rads) * (item.left - origin.left) +
    Math.cos(rads) * (item.top - origin.top) +
    origin.top;

  item.left = coords.left;
  item.top = coords.top;

  return item;
};

export const applyColorToFabricElement = (color, elem) => {
  const { width, height } = elem;
  if (color.type === FillType.Solid) {
    elem.set({
      fill: colorObjToString(color.values[0])
    });
  } else if (color.type === FillType.Linear) {
    const gradientStart = angle2rect(color.angle, width, height);
    const gradientEnd = {
      x: width - gradientStart.x,
      y: height - gradientStart.y
    };
    elem.setGradient("fill", {
      x1: gradientStart.x,
      y1: gradientStart.y,
      x2: gradientEnd.x,
      y2: gradientEnd.y,
      colorStops: {
        0: colorObjToString(color.values[0]),
        1: colorObjToString(color.values[1])
      }
    });
  } else if (color.type === FillType.Radial) {
    elem.setGradient("fill", {
      x1: width / 2,
      y1: height / 2,
      x2: width / 2,
      y2: height / 2,
      type: "radial",
      r1: width / 2,
      r2: 10,
      colorStops: {
        0: colorObjToString(color.values[0]),
        1: colorObjToString(color.values[1])
      }
    });
  }
};

export const colorObjToString = rgbObj => {
  return typeof rgbObj === "string"
    ? rgbObj
    : `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, ${rgbObj.a})`;
};

export const colorObjToCSSBackground = color => {
  if (color.type === FillType.Solid) {
    return colorObjToString(color.values[0]);
  } else if (color.type === FillType.Linear) {
    return `linear-gradient(to bottom, ${colorObjToString(
      color.values[0]
    )}, ${colorObjToString(color.values[1])})`;
  } else if (color.type === FillType.Radial) {
    return `radial-gradient(${colorObjToString(
      color.values[1]
    )}, ${colorObjToString(color.values[0])})`;
  }
};

export const angle2rect = (angle, sx, sy) => {
  while (angle < 0) angle += 360;
  angle %= 360;

  var a = sy,
    b = a + sx,
    c = b + sy,
    p = (sx + sy) * 2,
    rp = p / 360;
  var pp = Math.round((angle * rp + sy / 2) % p);

  if (pp <= a) return { x: 0, y: sy - pp };
  if (pp <= b) return { y: 0, x: pp - a };
  if (pp <= c) return { x: sx, y: pp - b };
  return { y: sy, x: sx - (pp - c) };
};

export const getScaleToFullyFit = ({ width, height, maxWidth, maxHeight }) => {
  let scaleToFitWidth = 1;
  let scaleToFitHeight = 1;
  if (width && width > maxWidth) {
    scaleToFitWidth = maxWidth / width;
  }
  if (height && height > maxHeight) {
    scaleToFitHeight = maxHeight / height;
  }
  const scaleToFullyFit = Math.min(scaleToFitWidth, scaleToFitHeight);
  return scaleToFullyFit;
};
