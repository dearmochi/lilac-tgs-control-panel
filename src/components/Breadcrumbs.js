import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default connect(state => ({ breadcrumb: state.breadcrumb }))(props => (
  <Breadcrumb className="mb-2">
    {props.breadcrumb.nodes.map(node => (
      <Breadcrumb.Item key={node.path}>
        {!node.root ? <Link to={node.path}>{node.name}</Link> : <HomeOutlined />}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
));