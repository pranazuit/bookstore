import { takeLatest, put } from 'redux-saga/effects';
import { IActionSaga } from 'src/services/action.saga';
import { CartAction } from './cart.action';
import { callPost, callGet, callDelete } from 'src/services/call-api';
import { ActionReducer } from 'src/services/action.reducer';

const host = `${process.env.REACT_APP_API_HOST}`;

function* cartListR(e: IActionSaga): any{
  try {
    const response = yield callGet(`${host}/cart/`);
    yield put(ActionReducer({ type: CartAction.CART_LIST_S, payload: response }));
    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
  }
}

function* addToCartR(e: IActionSaga): any{
  try {
    yield callPost(`${host}/add_to_cart/`, e.payload);
    const response = yield callGet(`${host}/cart/`);
    yield put(ActionReducer({ type: CartAction.CART_LIST_S, payload: response }));
    e.onSuccess(response);
  } catch (err) {
    e.onFailure(err);
  }
}

function* removeCartR(e: IActionSaga): any{
  try {
    const { cart_id } = e.payload
    yield callDelete(`${host}/cart/${cart_id}`);
    const response = yield callGet(`${host}/cart/`);
    yield put(ActionReducer({ type: CartAction.CART_LIST_S, payload: response }));
    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
  }
}

export default [
  takeLatest(CartAction.CART_LIST_R, (e: IActionSaga) => cartListR(e)),
  takeLatest(CartAction.ADD_TO_CART_R, (e: IActionSaga) => addToCartR(e)),
  takeLatest(CartAction.REMOVE_CART_R, (e: IActionSaga) => removeCartR(e)),
];
