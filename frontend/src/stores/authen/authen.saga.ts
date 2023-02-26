import { takeLatest, put } from 'redux-saga/effects';
import authService from 'src/services/auth.service';
import { IActionSaga } from 'src/services/action.saga';
import { AuthenAction } from './authen.action';
import jwtDecode from 'jwt-decode';
import { 
  callPost,
} from 'src/services/call-api';
import { ActionReducer } from 'src/services/action.reducer';
import { PaymentAction } from '../payment/payment.action';

const host = `${process.env.REACT_APP_API_HOST}`;

function* authenLoginR(e: IActionSaga): any{
  try {
    const response = yield callPost(`${host}/login/`, e.payload);
    yield put(ActionReducer({ type: AuthenAction.AUTHEN_LOGIN_S, payload: { access_token: response.data.access_token, username: response.data.username } }));

    authService.setAuthorization(response.data.access_token);
    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
  }
}

function* authenLogoutR(e: IActionSaga) {
  try {    
    authService.delAuthorization();

    // Clear reducer
    yield put(ActionReducer({ type: AuthenAction.AUTHEN_LOGOUT_S }));
    yield put(ActionReducer({ type: PaymentAction.CLEAR_PAYMENT_LIST_S }));
    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
  }
}

function* registerR(e: IActionSaga): any {
  try {    
    const response = yield callPost(`${host}/register/`, e.payload);
    console.log(response);
    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
  }
}

export default [
  takeLatest(AuthenAction.AUTHEN_LOGIN_R, (e: IActionSaga) => authenLoginR(e)),
  takeLatest(AuthenAction.AUTHEN_LOGOUT_R, (e: IActionSaga) => authenLogoutR(e)),
  takeLatest(AuthenAction.REGISTER_R, (e: IActionSaga) => registerR(e)),
];
