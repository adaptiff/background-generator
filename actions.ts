import { createAction } from "redux-actions";
import { Color } from "./types";

export const dumpState = createAction("DUMP_STATE");

export const refreshRandomSnapshot = createAction("REFRESH_RANDOM_SNAPSHOT");

export const setCanvasDimensions = createAction<{
  width: number;
  height: number;
}>("SET_CANVAS_DIMENSIONS");

export const setBackgroundColor = createAction<Color>("SET_BACKGROUND_COLOR");
export const setItemColor = createAction<{ index: number; color: Color }>(
  "SET_ITEM_COLOR"
);

export const addItemColor = createAction("ADD_ITEM_COLOR");
export const removeItemColor = createAction<{ index: number }>(
  "REMOVE_BACKGROUND_COLOR"
);

export const selectObject = createAction<{ id: number }>("SELECT_OBJECT");
export const selectAsOnlyObject = createAction<{ id: number }>(
  "SELECT_OBJECT_AS_ONLY"
);
export const deselectObject = createAction<{ id: number }>("DESELECT_OBJECT");

export const selectLayout = createAction<{ id: number }>("SELECT_LAYOUT");

export const setConfigValue = createAction<{
  configFieldName: string;
  configValue: any;
}>("SET_CONFIG_VALUE");

export const addUploadedObject = createAction<{ src: string; type: string }>(
  "ADD_UPLOADED_OBJECT"
);
