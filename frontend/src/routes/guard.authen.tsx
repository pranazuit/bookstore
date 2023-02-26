import { useSelector } from 'react-redux';
import { IStates } from 'src/stores/root.reducer';
import authService from 'src/services/auth.service';
import { isLoginScreen } from 'src/services/utils';
import { useHistory } from "react-router-dom";

function AuthGuard(props: any) {
  const history = useHistory();
  const { children } = props;
  const { token } = useSelector((state: IStates) => state.authenReducer);
  // Authen Only
  const isAuthen = authService.isValidToken(token);
  if (isAuthen === false) {
    history.push('/');
  }

  return children;
}

export default AuthGuard;
