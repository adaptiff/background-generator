/* global fetch */

import { all, select, put, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import "isomorphic-unfetch";
import {
  dumpState,
  setConfigValue,
  setLayoutMaxValueOverride
} from "./actions";
import { getSelectedLayout, getConfigField } from "./selectors";
import { AppState } from "./types/store";
import { copyToClipboard } from "./utils";

es6promise.polyfill();

function* dumpStateSaga() {
  const canvasWidth = yield select((state: AppState) => state.canvasWidth);
  const canvasHeight = yield select((state: AppState) => state.canvasHeight);
  const selectedLayoutId = yield select(
    (state: AppState) => state.selectedLayoutId
  );
  const selectedObjectIds = yield select(
    (state: AppState) => state.selectedObjectIds
  );
  const configValues = yield select((state: AppState) => state.configValues);
  const configColors = yield select((state: AppState) => state.configColors);
  copyToClipboard(
    JSON.stringify({
      canvasWidth,
      canvasHeight,
      selectedLayoutId,
      selectedObjectIds,
      configValues,
      configColors
    })
  );
  console.log("dumped to clipboard");
}

function* setConfigValueSaga(action) {
  const { configFieldName, configValue } = action.payload;

  const configField = yield select(getConfigField(configFieldName));

  if (configField && configField.maxValue < configValue) {
    yield put(setLayoutMaxValueOverride({ configFieldName, configValue }));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(dumpState, dumpStateSaga),
    takeLatest(setConfigValue, setConfigValueSaga)
  ]);
}

export default rootSaga;
