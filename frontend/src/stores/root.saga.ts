import { all } from 'redux-saga/effects';
import authenSaga from './authen/authen.saga';
import bookSaga from './book/book.saga';
import cartSaga from './cart/cart.saga';
import paymentSaga from './payment/payment.saga';
import historySaga from './history/history.saga';

const rootSaga = function*(){
    yield all([
        ...authenSaga,
        ...bookSaga,
        ...cartSaga,
        ...paymentSaga,
        ...historySaga,
    ]);
}
export default rootSaga