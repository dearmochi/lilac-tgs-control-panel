import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BreadcrumbHint from '../../components/BreadcrumbHint';
import InstanceDetails from './pages/InstanceDetails';
import InstanceList from './pages/InstanceList';

export default Instances => {
  const { path } = useRouteMatch();
  return (
    <>
      <BreadcrumbHint path="/instances" name="Instances" />
      <Switch>
        <Route exact path={path}>
          <InstanceList />
        </Route>
        <Route path={path + "/:id"}>
          <InstanceDetails />
        </Route>
      </Switch>
    </>
  );
};