import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import store, { hint, root } from '../store';

const BreadcrumbHint = props => {
  const { path, url } = useRouteMatch();
  const node = { ...props, path: url, root: props.root || undefined };
  useEffect(() => {
    store.dispatch(props.root ? root(node) : hint(node));
  });
  return null;
};

export default BreadcrumbHint;