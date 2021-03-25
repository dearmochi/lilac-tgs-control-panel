import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { updateServerInfo } from '../../middleware/serverinfo';
import { getServerInfoDispatch, getServerInfoState, ServerInfoProvider } from '../../store/serverinfo';

const AppMainBody = () => {
  const state = getServerInfoState();
  const dispatch = getServerInfoDispatch();
  React.useEffect(() => {
    updateServerInfo(dispatch);
  }, []);

  return (
    <HashRouter>
      <h1>Lilac</h1>
      <h2>TGS Version: {state?.version}</h2>
      <h2>TGS API URL: {process.env.TGS_API_URL}</h2>
      <h2>TGS API Version: {process.env.TGS_API_VERSION}</h2>
      <hr />
      <Navigation />
      <hr />
      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route path="/user">
          User
        </Route>
      </Switch>
    </HashRouter>
  );
}

const AppMain = () => (
  <ServerInfoProvider>
    <AppMainBody />
  </ServerInfoProvider>
);

//
export default AppMain;