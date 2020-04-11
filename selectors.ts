import { AppState } from "./types/store";
import layouts from "./layouts";
import objects from "./objects";

export const getConfigValue = configField => (state: AppState) =>
  state.configValues[configField];

export const getConfigFields = (state: AppState) =>
  getSelectedLayout(state).configFields || [];

export const getConfigField = configFieldName => (state: AppState) => {
  let configField = getConfigFields(state).find(
    configField => configField.name === configFieldName
  );
  const layoutMaxValuesOverrides = state.layoutMaxValuesOverrides;
  if (layoutMaxValuesOverrides[configFieldName]) {
    configField = {
      ...configField,
      maxValue: layoutMaxValuesOverrides[configFieldName]
    };
  }
  return configField;
};

export const getSelectedLayout = (state: AppState) =>
  layouts.find(layout => layout.id === state.selectedLayoutId);

export const getHasNonSVGObjects = (state: AppState) => {
  const allObjects = [...objects, ...state.uploadedObjects];
  let hasOnlySVGObjects = true;
  state.selectedObjectIds.forEach(selectedObjectId => {
    if (!hasOnlySVGObjects) {
      return;
    }
    const object = allObjects.find(o => o.id === selectedObjectId);
    if (object && !object.type.includes("svg")) {
      hasOnlySVGObjects = false;
    }
  });
  return !hasOnlySVGObjects;
};
