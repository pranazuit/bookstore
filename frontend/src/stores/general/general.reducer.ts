import { GeneralAction } from './general.action';
import { IActionReducer } from 'src/services/action.reducer';

export interface IGeneralState {
  modalLogin: boolean;
  modalRegister: boolean;
}
const GeneralState = {
  modalLogin: false,
  modalRegister: false,
} as IGeneralState;

export default (state = GeneralState, e: IActionReducer): IGeneralState => {
  switch (e.type) {
    case GeneralAction.SET_MODAL_LOGIN_S: {
      const isOpen = e.payload.isOpen;
      return { ...state, modalLogin: isOpen };
    }

    case GeneralAction.SET_MODAL_REGISTER_S: {
      const isOpen = e.payload.isOpen;
      return { ...state, modalRegister: isOpen };
    }

    default:
      return state;
  }
};
