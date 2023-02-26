import { IActionReducer } from 'src/services/action.reducer';
import { BookAction } from './book.action';

export interface IBookState {
  list: any[];
  detail: object;
}
const BookState = {
  list: [],
  detail: {},
} as IBookState;

export default (state = BookState, e: IActionReducer) => {
  switch (e.type) {
    case BookAction.BOOK_LIST_S:
      return { ...state, list: e.payload }

    case BookAction.BOOK_DETAIL_S:
      return { ...state, detail: e.payload }

    default: {
      return state;
    }
  }
};
