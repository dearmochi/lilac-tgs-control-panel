import createStore from './_base';

enum AuthActionType {
  LoggedIn
};

interface AuthState {
  loggedIn: boolean,
  user: {
    id: number,
    name: string
  }
};
interface AuthAction {
  type: AuthActionType,
  payload: any
};

type AuthDispatch = React.Dispatch<AuthAction> | undefined;

const reducer = (state: AuthState, action: AuthAction): any => {
  switch (action.type) {
    case AuthActionType.LoggedIn:
      return { ...state, loggedIn: true, user: action.payload };
    default:
      throw 'unknown action';
  }
};

//
const initialState = {
  loggedIn: false,
  user: {
    id: 0,
    name: ''
  }
};

const { 
  stateContext: AuthStateContext, 
  dispatchContext: AuthDispatchContext, 
  provider: AuthProvider,
  getState: getAuthState,
  getDispatch: getAuthDispatch
} = createStore(initialState, reducer);

export {
  AuthStateContext as default,
  AuthDispatchContext,
  AuthProvider,
  getAuthState,
  getAuthDispatch,

  AuthActionType,
  AuthAction,
  AuthDispatch,
};

