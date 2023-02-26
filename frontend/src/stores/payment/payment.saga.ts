import { takeLatest, put } from 'redux-saga/effects';
import { IActionSaga } from 'src/services/action.saga';
import { PaymentAction } from './payment.action';
import { callPost, callGet, callDelete } from 'src/services/call-api';
import { ActionReducer } from 'src/services/action.reducer';

const host = `${process.env.REACT_APP_API_HOST}`;

function* paymentR(e: IActionSaga): any{
    try {
      yield callPost(`${host}/payment/`, e.payload);
      e.onSuccess();
    } catch (err) {
      e.onFailure(err);
    }
}

function* getPaymentR(e: IActionSaga): any{
  try {
    const response = yield callGet(`${host}/get_payment/`);
    e.onSuccess(response);
  } catch (err) {
    e.onFailure(err);
  }
}

export default [
  takeLatest(PaymentAction.PAYMENT_R, (e: IActionSaga) => paymentR(e)),
  takeLatest(PaymentAction.GET_PAYMENT_R, (e: IActionSaga) => getPaymentR(e)),
];
