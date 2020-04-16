import { RGBColor } from "react-color";

export enum FillType {
  Solid = "solid",
  Linear = "linear",
  Radial = "radial"
}

export type Color = {
  type: FillType;
  values: (string | RGBColor)[];
  angle?: number;
  xShift?: number;
  yShift?: number;
};

export enum ConfigFieldType {
  NumberInput = "NumberInput",
  BoolWithNumberInput = "BoolWithNumberInput",
  Hidden = "Hidden"
}

export type Layout = {
  id: number;
  src: string;
  configFields: any[];
  generate: (width: number, height: number, configValues: any) => any[];
};

export type ImageObject = {
  id: number;
  src: string;
  thumbSize?: string;
  type?: string;
};
