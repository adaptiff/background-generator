import { AppState } from "./types/store";
import layouts from "./layouts";
import objects from "./objects";

export const getConfigValue = configField => (state: AppState) =>
  state.configValues[configField];

export const getConfigFields = (state: AppState) =>
  getSelectedLayout(state).configFields || [];

export const getConfigField = configFieldName => (state: AppState) =>
  getConfigFields(state).find(
    configField => configField.name === configFieldName
  );

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
