import { fork, take, call, put, delay } from "redux-saga/effects";
import { CommonActions } from "../Redux/CommonSlices";
import { getData } from "../../api/getData.api";
function* handleFetchData(payload: any) {
  try {
    yield put(CommonActions.displayLoading());
    const { data, status } = yield call(getData, payload);
    yield delay(1000);
    if (status === 200) {
      yield put(CommonActions.setData(data));
      yield put(CommonActions.hideLoading());
    }
  } catch (error) {}
}
function* watchfetchData() {
  while (true) {
    const { payload } = yield take(CommonActions.fetchData.type);
    yield call(handleFetchData, payload);
  }
}
export function* CommonSaga() {
  yield fork(watchfetchData);
}
