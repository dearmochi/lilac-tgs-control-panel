import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const AuthRequired = (ComposedComponent) => {
  return connect(state => ({ auth: state.auth }))((props) => (
    !props.auth.isAuthed ? <Redirect to="/login" /> : <ComposedComponent />
  ));
};

export const AuthRequiredEx = (ComposedComponent) => {
  return connect(state => ({ auth: state.auth }))((props) => (
    props.auth.isAuthed ? <Redirect to="/home" /> : <ComposedComponent />
  ));
};

export default AuthRequired;