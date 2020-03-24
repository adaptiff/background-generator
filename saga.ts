/* global fetch */

import { all, select, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import "isomorphic-unfetch";
import { dumpState } from "./actions";
import { AppState } from "./types/store";

es6promise.polyfill();

function* dumpStateSaga() {
  const configValues = yield select((state: AppState) => state.configValues);
  console.log(configValues);
}

function* rootSaga() {
  yield all([takeLatest(dumpState, dumpStateSaga)]);
}

export default rootSaga;
