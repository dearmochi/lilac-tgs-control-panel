import { ServerInformationResponse } from '../types/tgs';
import createStore from './_base';

enum ServerInfoActionType {
  Update
}

interface ServerInfoState extends ServerInformationResponse {}
interface ServerInfoAction {
  type: ServerInfoActionType,
  payload: any
}

type ServerInfoDispatch = React.Dispatch<ServerInfoAction> | undefined;

const reducer = (state: ServerInfoState, action: ServerInfoAction): any => {
  switch (action.type) {
    case ServerInfoActionType.Update:
      return { ...state, ...action.payload };
    default:
      throw 'unknown action';
  }
};

//
const initialState: ServerInfoState = {};

const { 
  stateContext: ServerInfoStateContext, 
  dispatchContext: ServerInfoDispatchContext, 
  provider: ServerInfoProvider,
  getState: getServerInfoState,
  getDispatch: getServerInfoDispatch
} = createStore(initialState, reducer);

export {
  ServerInfoStateContext as default,
  ServerInfoDispatchContext,
  ServerInfoProvider,
  getServerInfoState,
  getServerInfoDispatch,

  ServerInfoActionType,
  ServerInfoAction,
  ServerInfoDispatch,
};

