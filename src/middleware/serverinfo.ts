import { ServerInfoActionType, ServerInfoDispatch } from '../store/serverinfo';
import { ServerInformationResponse } from '../types/tgs';
import axios from './axios';

const updateServerInfo = (dispatch: ServerInfoDispatch) => {
  if (!dispatch) {
    return;
  }

  axios.get<ServerInformationResponse>('/')
    .then(response => {
      dispatch({ type: ServerInfoActionType.Update, payload: response.data });
    });
};

//
export {
  updateServerInfo
};

