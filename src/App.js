import { DatabaseOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AuthStatus from './components/AuthStatus';
import BreadcrumbHint from './components/BreadcrumbHint';
import Breadcrumbs from './components/Breadcrumbs';
import Instances from './pages/Instances';
import store, { login } from './store';
import './styles/util.scss';
import Auth from './utils/authentication';

const App = props => {
  const { path } = useRouteMatch();

  // Refresh the user state in Redux (in case of refresh)
  useEffect(() => {
    if (!props.auth.user) {
      Auth.user()
        .then(response => {
          store.dispatch(login(response.data));
        })
        .catch(error => message.error("Failed to retrieve user info. (" + error.response.status + ")"));
    }
  });

  return (
    <>
      <BreadcrumbHint path="/home" name="Lilac" root />
      <Layout>
        <Header>
          <Link to={path}>Lilac</Link>
          <span className="float-right">
            <AuthStatus auth={props.auth} />
          </span>
        </Header>
        <Layout>
          <Sider>
            <Navigation pathname={path} />
          </Sider>
          <Content className="p-2">
            <Breadcrumbs />
            <ContentSwitch pathname={path} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default connect(state => ({ auth: state.auth }))(App);

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