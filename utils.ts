import { FillType } from "./types";
import layouts from "./layouts";

export const copyToClipboard = (text) => {
  if (window["clipboardData"] && window["clipboardData"].setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return window["clipboardData"].setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
};

export const getDefaultConfigValues = (layoutId) => {
  const layout = layouts.find((layout) => layout.id === layoutId);
  const configValues = {};
  layout.configFields.forEach((configField) => {
    configValues[configField.name] = configField.defaultValue;
  });
  return configValues;
};

export const deg2rad = (angle) => {
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

  let fabricColor;
  if (color.type === FillType.Solid) {
    fabricColor = colorObjToString(color.values[0]);
  } else if (color.type === FillType.Linear) {
    const gradientStart = angle2rect(color.angle, width, height);
    const gradientEnd = {
      x: width - gradientStart.x,
      y: height - gradientStart.y,
    };
    let currentOffset = 0;
    const offsetStep = Math.floor(100 / (color.values.length - 1));
    const colorStops = [];
    color.values.forEach((color) => {
      colorStops.push({
        offset: currentOffset / 100,
        color: colorObjToString(color),
      });
      currentOffset += offsetStep;
    });
    fabricColor = new window["fabric"].Gradient({
      coords: {
        x1: gradientStart.x,
        y1: gradientStart.y,
        x2: gradientEnd.x,
        y2: gradientEnd.y,
      },
      colorStops,
    });
  } else if (color.type === FillType.Radial) {
    fabricColor = new window["fabric"].Gradient({
      coords: {
        x1: width / 2 + (color.xShift / 100) * width,
        y1: height / 2 + (color.yShift / 100) * height,
        x2: width / 2 + (color.xShift / 100) * width,
        y2: height / 2 + (color.yShift / 100) * height,
        r1: width / 2,
        r2: 10,
      },
      type: "radial",
      colorStops: [
        {
          offset: 0,
          color: colorObjToString(color.values[0]),
        },
        {
          offset: 1,
          color: colorObjToString(color.values[1]),
        },
      ],
    });
  }
  if (elem.stroke) {
    elem.set("fill", null);
    elem.set("stroke", fabricColor);
  } else {
    elem.set("fill", fabricColor);
    elem.set("stroke", null);
  }
};

export const colorStopByColor = (position, rgbObj) => {
  return {
    offset: position,
    color: `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
    opacity: rgbObj.a,
  };
};

export const colorObjToString = (rgbObj) => {
  return typeof rgbObj === "string"
    ? rgbObj
    : `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, ${rgbObj.a})`;
};

export const colorObjToCSSBackground = (color) => {
  if (color.type === FillType.Solid) {
    return colorObjToString(color.values[0]);
  } else if (color.type === FillType.Linear) {
    const colors = color.values.map(colorObjToString).join(",");
    return `linear-gradient(to bottom, ${colors})`;
  } else if (color.type === FillType.Radial) {
    const colors = color.values.map(colorObjToString).join(",");
    return `radial-gradient(${colors})`;
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
