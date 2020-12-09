import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './styles/util.scss';

export default AppLogin => {
  // Login state.
  const [loginStatus, setLoginStatus] = useState({ loggingIn: false, success: false })

  // Attempts login and updates the state accordingly.
  const tryLogin = (values) => {
    if (loginStatus.loggingIn) {
      return;
    }

    setLoginStatus({ ...loginStatus, loggingIn: true });
    Axios.post(process.env.LILAC_TGS_API_URL, {}, {
      headers: {
        "Api": process.env.LILAC_TGS_API_VERSION,
        "Authorization": "Basic " + btoa(values.username + ":" + values.password)
      },
    })
      .then(response => {
        sessionStorage.setItem("bearerToken", response.data.bearer);
        sessionStorage.setItem("bearerTokenExpiry", Date.parse(response.data.expiresAt));
        setLoginStatus(prevState => ({ ...prevState, success: true }));
      })
      .catch(error => {
        setLoginStatus(prevState => ({ ...prevState, loggingIn: false }))
        message.error("Failed to log in. (" + error.response.status + ")");
      });
  };

  if (loginStatus.success) {
    return (
      <Redirect to="/" />
    );
  }

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