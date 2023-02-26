import { takeLatest, put } from 'redux-saga/effects';
import { IActionSaga } from 'src/services/action.saga';
import { BookAction } from './book.action';
import { callPost, callGet } from 'src/services/call-api';
import { ActionReducer } from 'src/services/action.reducer';

const host = `${process.env.REACT_APP_API_HOST}`;

function* bookListR(e: IActionSaga): any{
  try {
    const response = yield callGet(`${host}/book/`, e.payload);
    yield put(ActionReducer({ type: BookAction.BOOK_LIST_S, payload: response }));
    e.onSuccess(response);
  } catch (err) {
    e.onFailure();
  }
}

function* bookDetailR(e: IActionSaga): any{
  try {
    const { book_id } = e.payload
    const response = yield callGet(`${host}/book/${book_id}/`);
    yield put(ActionReducer({ type: BookAction.BOOK_DETAIL_S, payload: response }));
    e.onSuccess(response);
  } catch (err) {
    e.onFailure();
  }
}

export default [
  takeLatest(BookAction.BOOK_LIST_R, (e: IActionSaga) => bookListR(e)),
  takeLatest(BookAction.BOOK_DETAIL_R, (e: IActionSaga) => bookDetailR(e)),
];
