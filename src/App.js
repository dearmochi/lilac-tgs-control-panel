import { DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './styles/util.scss';

export default App => {
  const isLoggedIn = sessionStorage.getItem("bearerToken") !== null;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout>
      <Header>
        <Link to="/">Lilac</Link>
      </Header>
      <Layout>
        <Sider>
          <Navigation />
        </Sider>
        <Content className="p-2">
          <ContentSwitch />
        </Content>
      </Layout>
    </Layout>
  );
};

const Navigation = () => (
  <Menu mode="vertical">
    <Menu.Item>
      <Link to="/instances">
        <DatabaseOutlined />
        Instances
      </Link>
    </Menu.Item>
  </Menu>
);

const ContentSwitch = () => {
  return (
    <Switch>
      <Route exact path="/">
        INDEX
      </Route>
      <Route path="/instances">
        <Switch>
          <Route exact path="/instances">
            INSTANCES
          </Route>
          <Route path="/instances/:instanceId">
            INSTANCE ID
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
};