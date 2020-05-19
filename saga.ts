/* global fetch */

import { all, select, put, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import "isomorphic-unfetch";
import {
  dumpState,
  setConfigValue,
  setLayoutMaxValueOverride,
  overrideState,
} from "./actions";
import { getConfigField, getConfigFields } from "./selectors";
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
      configColors,
    })
  );
  console.log("dumped to clipboard");
}

function* setConfigValueSaga(action) {
  const { configFieldName, configValue, isChangingDone } = action.payload;

  const configField = yield select(getConfigField(configFieldName));

  if (configField && configField.maxValue < configValue) {
    yield put(setLayoutMaxValueOverride({ configFieldName, configValue }));
  }
}

function* overrideStateSaga(action) {
  const { configValues } = action.payload!.newState!;
  const configFields = yield select(getConfigFields);
  const actions = [];
  configFields.forEach((configField) => {
    if (
      configField.maxValue &&
      configValues[configField.name] >= configField.maxValue
    ) {
      actions.push(
        setLayoutMaxValueOverride({
          configFieldName: configField.name,
          configValue: configValues[configField.name],
        })
      );
    }
  });
  yield all(actions.map((action) => put(action)));
}

function* rootSaga() {
  yield all([
    takeLatest(dumpState, dumpStateSaga),
    takeLatest(setConfigValue, setConfigValueSaga),
    takeLatest(overrideState, overrideStateSaga),
  ]);
}

export default rootSaga;
