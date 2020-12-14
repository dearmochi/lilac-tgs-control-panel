import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * Returns a component that may only be accessed by authenticated users.
 * @param {*} ComposedComponent The component to wrap.
 */
const AuthRequired = ComposedComponent => {
  return connect(state => ({ auth: state.auth }))((props) => (
    !props.auth.isAuthed ? <Redirect to="/login" /> : <ComposedComponent />
  ));
};

/**
 * Returns a component that may only be accessed by NON authenticated users.
 * @param {*} ComposedComponent The component to wrap.
 */
export const AuthForbidden = ComposedComponent => {
  return connect(state => ({ auth: state.auth }))((props) => (
    props.auth.isAuthed ? <Redirect to="/home" /> : <ComposedComponent />
  ));
};

export default AuthRequired;