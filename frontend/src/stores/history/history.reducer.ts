import { IActionReducer } from 'src/services/action.reducer';
import { HistoryAction } from './history.action';

export interface IHistoryState {
  list: any[];
}
const HistoryState = {
  list: [],
} as IHistoryState;

export default (state = HistoryState, e: IActionReducer) => {
  switch (e.type) {
    case HistoryAction.HISOTRY_LIST_S:
      return { ...state, list: e.payload }

    default: {
      return state;
    }
  }
};
