import { AppState } from "./types/store";
import layouts from "./layouts";
import objects from "./objects";

export const getConfigValue = (configField) => (state: AppState) =>
  state.configValues[configField] !== undefined
    ? state.configValues[configField]
    : (getConfigField(configField)(state) || {})["defaultValue"];

export const getConfigFields = (state: AppState) =>
  getSelectedLayout(state).configFields || [];

export const getHasRandomnessOnAnyField = (state: AppState) => {
  const fields = getConfigFields(state);
  let hasRandomness = false;
  fields.map((field) => {
    if (field.withRandomness && getConfigValue(field.name)(state)) {
      hasRandomness = true;
    }
    if (
      field.name === "withRandomObjectOrder" &&
      getConfigValue(field.name)(state) &&
      state.selectedObjectIds.length > 1
    ) {
      hasRandomness = true;
    }
    if (
      field.name === "withRandomColor" &&
      getConfigValue(field.name)(state) &&
      state.configColors.objectColors.length > 1
    ) {
      hasRandomness = true;
    }
  });
  return hasRandomness;
};

export const getConfigField = (configFieldName) => (state: AppState) => {
  let configField = getConfigFields(state).find(
    (configField) => configField.name === configFieldName
  );
  const layoutMaxValuesOverrides = state.layoutMaxValuesOverrides;
  if (layoutMaxValuesOverrides[configFieldName]) {
    configField = {
      ...configField,
      maxValue: layoutMaxValuesOverrides[configFieldName],
    };
  }
  return configField;
};

export const getSelectedLayout = (state: AppState) =>
  layouts.find((layout) => layout.id === state.selectedLayoutId);

export const getHasNonSVGObjects = (state: AppState) => {
  const allObjects = [...objects, ...state.uploadedObjects];
  let hasOnlySVGObjects = true;
  state.selectedObjectIds.forEach((selectedObjectId) => {
    if (!hasOnlySVGObjects) {
      return;
    }
    const object = allObjects.find((o) => o.id === selectedObjectId);
    if (object && !object.type.includes("svg")) {
      hasOnlySVGObjects = false;
    }
  });
  return !hasOnlySVGObjects;
};
