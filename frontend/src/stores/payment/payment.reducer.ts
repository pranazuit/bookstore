import { IActionReducer } from 'src/services/action.reducer';
import { PaymentAction } from './payment.action';

export interface IPaymentState {
  list: any[];
  total: number;
}
const PaymentState = {
  list: [],
  total: 0,
} as IPaymentState;

export default (state = PaymentState, e: IActionReducer) => {
  switch (e.type) {
    case PaymentAction.PAYMENT_LIST_S:
      return { ...state, list: e.payload.list, total: e.payload.total }
    case PaymentAction.CLEAR_PAYMENT_LIST_S:
      return { ...state, ...PaymentState }

    default: {
      return state;
    }
  }
};
