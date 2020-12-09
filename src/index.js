import { ControlOutlined, DatabaseOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.dark.css';
import React from 'react';
import { render } from 'react-dom';

const { Header, Sider, Footer } = Layout;

const App = () => (
  <Layout>
    <Header>Lilac</Header>
    <Layout>
      <Sider>
        <Menu> 
          <Menu.Item icon={<DatabaseOutlined />}>Instances</Menu.Item>
          <Menu.Item icon={<UserOutlined />}>Users</Menu.Item>
          <Menu.Item icon={<ControlOutlined />}>Administration</Menu.Item>
          <Menu.Item icon={<SettingOutlined />}>Configuration</Menu.Item>
        </Menu>
      </Sider>
    </Layout>
    <Footer>footer</Footer>
  </Layout>
);

render(<App />, document.getElementById("react-root")); 