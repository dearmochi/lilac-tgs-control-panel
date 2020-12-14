import { UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const AuthStatus = props => (
  <>
    {props.auth.user ? (
      <b>
        <UserOutlined /> Logged in as {props.auth.user.name}
      </b>
    ) : (
      <Spin />
    )}
  </>
);

export default AuthStatus;