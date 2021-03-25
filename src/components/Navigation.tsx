import * as React from 'react';
import { Link } from 'react-router-dom';
import { getAuthState } from '../store/auth';

const Navigation = () => {
  const auth = getAuthState();
  return (
    <h3>
      <Link to="/">Home</Link> |&nbsp; 
      <Link to="/user">User: {auth?.user.name} ({auth?.user.id})</Link>
    </h3>
  );
};

//
export default Navigation;