import { DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Instances from './pages/Instances';
import './styles/util.scss';

export default App => {
  const match = useRouteMatch();
  return (
    <Layout>
      <Header>
        <Link to={match.url}>Lilac</Link>
      </Header>
      <Layout>
        <Sider>
          <Navigation pathname={match.url} />
        </Sider>
        <Content className="p-2">
          <ContentSwitch pathname={match.url} />
        </Content>
      </Layout>
    </Layout>
  );
};

const Navigation = props => (
  <Menu mode="vertical">
    <Menu.Item>
      <Link to={props.pathname + "/instances"}>
        <DatabaseOutlined />
        Instances
      </Link>
    </Menu.Item>
  </Menu>
);

const ContentSwitch = props => {
  return (
    <Switch>
      <Route exact path={props.pathname}>
        Home
      </Route>
      <Route path={props.pathname + "/instances"} component={Instances} />
    </Switch>
  );
};