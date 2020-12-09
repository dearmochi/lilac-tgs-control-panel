import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App';
import AppLogin from './AppLogin';
import './styles/themes/default.less';

const out = () => (
  <BrowserRouter>
    <Route path="/" render={() => (
      <Fragment>
        {!!sessionStorage.getItem("bearerToken") ? <App /> : <Redirect to="/login" />}
      </Fragment>
    )} />
    <Route path="/login">
      {!!!sessionStorage.getItem("bearerToken") ? <AppLogin /> : <Redirect to="/" />}
    </Route>
  </BrowserRouter>
);

render(out(), document.getElementById("react-root")); 