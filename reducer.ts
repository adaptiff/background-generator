import { handleActions } from "redux-actions";
import { AppState } from "./types/store";
import {
  addUploadedObject,
  setCanvasDimensions,
  setBackgroundColor,
  setConfigValue,
  refreshRandomSnapshot,
  setItemColor,
  addItemColor,
  removeItemColor,
  selectObject,
  selectAsOnlyObject,
  deselectObject,
  selectLayout,
  addEmojiObject,
  overrideState,
  setLayoutMaxValueOverride,
} from "./actions";
import { FillType } from "./types";
import layouts from "./layouts";
import { getDefaultConfigValues } from "./utils";

const selectedLayoutId = 1;

let nextCustomObjectId = -1;

export const initState: AppState = {
  canvasWidth: 600,
  canvasHeight: 600,
  configColors: {
    backgroundColor: { type: FillType.Solid, values: ["#fff", "#ccc"] },
    objectColors: [{ type: FillType.Solid, values: ["#000", "#ccc"] }],
  },
  configValues: getDefaultConfigValues(selectedLayoutId),
  selectedLayoutId,
  layoutMaxValuesOverrides: {},
  selectedObjectIds: [3],
  uploadedObjects: [],
  currentRandomSnapshot: Math.random(),
};

const reducer = handleActions<AppState, any>(
  {
    [overrideState.toString()]: (
      state,
      action: ReturnType<typeof overrideState>
    ) => {
      nextCustomObjectId =
        Math.min(
          nextCustomObjectId,
          ...((action.payload.newState.uploadedObjects || []).map(
            (obj) => obj.id
          ) || [])
        ) - 1;
      return {
        ...state,
        ...action.payload.newState,
      };
    },
    [setLayoutMaxValueOverride.toString()]: (
      state,
      action: ReturnType<typeof setLayoutMaxValueOverride>
    ) => {
      const newLayoutMaxValuesOverrides = { ...state.layoutMaxValuesOverrides };
      newLayoutMaxValuesOverrides[action.payload.configFieldName] =
        action.payload.configValue * 1.5;
      return {
        ...state,
        layoutMaxValuesOverrides: newLayoutMaxValuesOverrides,
      };
    },
    [setCanvasDimensions.toString()]: (
      state,
      action: ReturnType<typeof setCanvasDimensions>
    ) => ({
      ...state,
      canvasWidth: action.payload.width,
      canvasHeight: action.payload.height,
    }),
    [setBackgroundColor.toString()]: (
      state,
      action: ReturnType<typeof setBackgroundColor>
    ) => ({
      ...state,
      configColors: {
        ...state.configColors,
        backgroundColor: {
          ...state.configColors["backgroundColor"],
          ...action.payload,
        },
      },
    }),
    [setItemColor.toString()]: (
      state,
      action: ReturnType<typeof setItemColor>
    ) => {
      const newObjectColors = [...state.configColors.objectColors];

      newObjectColors[action.payload.index] = action.payload.color;

      return {
        ...state,
        configColors: {
          ...state.configColors,
          objectColors: newObjectColors,
        },
      };
    },
    [addItemColor.toString()]: (state) => {
      const { objectColors } = state.configColors;
      const newObjectColors = [
        ...objectColors,
        objectColors[objectColors.length - 1],
      ];

      return {
        ...state,
        configColors: {
          ...state.configColors,
          objectColors: newObjectColors,
        },
      };
    },
    [removeItemColor.toString()]: (
      state,
      action: ReturnType<typeof removeItemColor>
    ) => {
      const newObjectColors = [...state.configColors.objectColors];
      newObjectColors.splice(action.payload.index, 1);
      return {
        ...state,
        configColors: {
          ...state.configColors,
          objectColors: newObjectColors,
        },
      };
    },
    [setConfigValue.toString()]: (
      state,
      action: ReturnType<typeof setConfigValue>
    ) => ({
      ...state,
      configValues: {
        ...state.configValues,
        [action.payload.configFieldName]: action.payload.configValue,
      },
    }),
    [refreshRandomSnapshot.toString()]: (
      state,
      action: ReturnType<typeof refreshRandomSnapshot>
    ) => ({
      ...state,
      configValues: {
        ...state.configValues,
        currentRandomSnapshot: Math.random(),
      },
    }),
    [selectObject.toString()]: (
      state,
      action: ReturnType<typeof selectObject>
    ) => {
      return {
        ...state,
        selectedObjectIds: [...state.selectedObjectIds, action.payload.id],
      };
    },
    [deselectObject.toString()]: (
      state,
      action: ReturnType<typeof deselectObject>
    ) => {
      return {
        ...state,
        selectedObjectIds: state.selectedObjectIds.filter(
          (id) => id !== action.payload.id
        ),
      };
    },
    [selectAsOnlyObject.toString()]: (
      state,
      action: ReturnType<typeof selectObject>
    ) => {
      return {
        ...state,
        selectedObjectIds: [action.payload.id],
      };
    },
    [selectLayout.toString()]: (
      state,
      action: ReturnType<typeof selectLayout>
    ) => {
      const oldConfigValues = state.configValues;
      const newConfigValues = {};
      const newSelectedLayout = layouts.find(
        (layout) => layout.id === action.payload.id
      );
      newSelectedLayout.configFields.forEach((configField) => {
        newConfigValues[configField.name] = configField.isShared
          ? oldConfigValues[configField.name]
          : configField.defaultValue;
      });
      return {
        ...state,
        selectedLayoutId: action.payload.id,
        configValues: newConfigValues,
      };
    },
    [addUploadedObject.toString()]: (
      state,
      action: ReturnType<typeof addUploadedObject>
    ) => {
      return {
        ...state,
        uploadedObjects: [
          ...state.uploadedObjects,
          {
            id: nextCustomObjectId--,
            src: action.payload.src,
            type: action.payload.type,
          },
        ],
        selectedObjectIds: [nextCustomObjectId + 1],
      };
    },
    [addEmojiObject.toString()]: (
      state,
      action: ReturnType<typeof addUploadedObject>
    ) => {
      return {
        ...state,
        uploadedObjects: [
          ...state.uploadedObjects,
          {
            id: nextCustomObjectId--,
            src: action.payload.src,
            type: "emoji",
          },
        ],
        selectedObjectIds: [nextCustomObjectId + 1],
      };
    },
  },
  initState
);

export default reducer;
