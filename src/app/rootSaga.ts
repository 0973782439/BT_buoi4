import { all } from "redux-saga/effects";
import { CommonSaga } from "./Saga/CommonSaga";
export function* rootSaga() {
  yield all([CommonSaga()]);
}
