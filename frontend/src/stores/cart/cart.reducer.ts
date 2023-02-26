import { IActionReducer } from 'src/services/action.reducer';
import { CartAction } from './cart.action';

export interface ICartState {
  list: any[];
}
const CartState = {
  list: [],
} as ICartState;

export default (state = CartState, e: IActionReducer) => {
  switch (e.type) {
    case CartAction.CART_LIST_S:
      return { ...state, list: e.payload }

    default: {
      return state;
    }
  }
};
