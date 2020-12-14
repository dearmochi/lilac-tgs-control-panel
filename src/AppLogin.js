import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import './styles/util.scss';
import Auth from './utils/authentication';

export default AppLogin => {
  // Login state.
  const [loginStatus, setLoginStatus] = useState({ loggingIn: false })

  // Attempts login and updates the state accordingly.
  const tryLogin = (values) => {
    if (loginStatus.loggingIn) {
      return;
    }

    // Update our state.
    setLoginStatus({ ...loginStatus, loggingIn: true });

    // Make the request.
    Auth.login(values.username, values.password)
      .catch(error => setLoginStatus(prevState => ({ ...prevState, loggingIn: false })));
  };

  return (
    <Layout>
      <Content className="d-flex">
        <Card title="Lilac Control Panel Login" className="mx-auto" style={{ width: "33%", alignSelf: "center" }}>
          <Form onFinish={tryLogin}>
            <Form.Item
              name="username"
              rules={[{ required: true }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true }]}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="mb-0 float-right">
              <Button type="primary" htmlType="submit" loading={loginStatus.loggingIn}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};