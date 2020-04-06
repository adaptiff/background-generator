/* global fetch */

import { all, select, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import "isomorphic-unfetch";
import { dumpState } from "./actions";
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

function* rootSaga() {
  yield all([takeLatest(dumpState, dumpStateSaga)]);
}

export default rootSaga;
