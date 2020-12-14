import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './api.js';
import App from './App';
import AppLogin from './AppLogin';
import AuthRequired, { AuthForbidden } from './components/AuthRequired.js';
import store from './store.js';
import './styles/themes/default.less';

const out = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/login" component={AuthForbidden(AppLogin)} />
        <Route path="/home" component={AuthRequired(App)} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(out, document.getElementById("react-root"));