import { combineReducers } from 'redux';
import authenReducer, { IAuthenState } from './authen/authen.reducer';
import generalReducer, { IGeneralState } from './general/general.reducer';
import bookReducer, { IBookState } from './book/book.reducer';
import cartReducer, {ICartState} from './cart/cart.reducer';
import paymentReducer, {IPaymentState} from './payment/payment.reducer';
import historyReducer, {IHistoryState} from './history/history.reducer';

export const rootPersist = ['authenReducer', 'paymentReducer'];
export const authPersist = ['authenReducer'];

export interface IStates {
    authenReducer: IAuthenState
    generalReducer: IGeneralState
    bookReducer: IBookState
    cartReducer: ICartState
    paymentReducer: IPaymentState
    historyReducer: IHistoryState
}
const rootReducer = combineReducers({
    authenReducer,
    generalReducer,
    bookReducer,
    cartReducer,
    paymentReducer,
    historyReducer,
})
export default rootReducer