import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import InstanceDetails from './pages/InstanceDetails';
import InstanceList from './pages/InstanceList';

export default Instances => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        <InstanceList />
      </Route>
      <Route path={match.url + "/:id"}>
        <InstanceDetails />
      </Route>
    </Switch>
  );
};