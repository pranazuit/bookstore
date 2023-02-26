import { takeLatest, put } from 'redux-saga/effects';
import { IActionSaga } from 'src/services/action.saga';
import { callPost, callGet } from 'src/services/call-api';
import { ActionReducer } from 'src/services/action.reducer';
import { HistoryAction } from './history.action';

const host = `${process.env.REACT_APP_API_HOST}`;

function* historyListR(e: IActionSaga): any{
  try {
    const response = yield callGet(`${host}/history/`);
    yield put(ActionReducer({ type: HistoryAction.HISOTRY_LIST_S, payload: response }));
    e.onSuccess();
  } catch (err) {
    e.onFailure();
  }
}

export default [
  takeLatest(HistoryAction.HISTORY_LIST_R, (e: IActionSaga) => historyListR(e)),
];
