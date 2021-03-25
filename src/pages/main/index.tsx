import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const AppMain = () => (
  <HashRouter>
    <h1>Lilac</h1>
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

//
export default AppMain;