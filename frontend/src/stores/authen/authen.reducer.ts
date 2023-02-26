import { IActionReducer } from 'src/services/action.reducer';
import { AuthenAction } from './authen.action';

export interface IAuthenState {
  isLoggedIn: boolean;
  token: string | undefined;
  username: string;
}
const AuthenState = {
  isLoggedIn: false, // true : ล็อกอินแล้ว
  token: undefined, //  token ที่ได้จากการ login
  username: "",
} as IAuthenState;

export default (state = AuthenState, e: IActionReducer) => {
  switch (e.type) {
    case AuthenAction.AUTHEN_LOGIN_S: {
      const token = e.payload.access_token;
      const username = e.payload.username;
      return { ...state, isLoggedIn: true, token, username };
    }

    case AuthenAction.AUTHEN_LOGOUT_S: {
      return { ...state, ...AuthenState };
    }

    default: {
      return state;
    }
  }
};
