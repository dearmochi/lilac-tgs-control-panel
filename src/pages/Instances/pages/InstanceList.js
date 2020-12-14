import { message, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import Monospace from '../../../components/Monospace';
import Tgs from '../../../utils/tgs';

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "100px",
  },
  {
    title: "Instance Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Link to={record.url}>
        {text}
      </Link>
    ),
  },
  {
    title: "Path",
    dataIndex: "path",
    key: "path",
    render: text => (
      <Monospace>
        {text}
      </Monospace>
    )
  },
  {
    title: "Status",
    dataIndex: "online",
    key: "online",
    width: "100px",
    render: online => (
      <Tag color={online ? "green" : "red"}>
        {online ? "Online" : "Offline"}
      </Tag>
    ),
  },
];

const InstanceList = () => {
  const { path } = useRouteMatch();

  // State.
  const [data, setData] = useState({ instances: null });

  // Get instances from API.
  useEffect(() => {
    // Make the request.
    Tgs.get("Instance/List")
      .then(response => {
        // Update our state.
        setData(prevState => ({ 
          ...prevState, 
          instances: response.data.map((entry, i) => ({
            ...entry, 
            key: i,
            url: path + "/" + entry.id,
          })),
        }));
      })
      .catch(error => message.error("Failed to retrieve instance list. (" + error.response.status + ")"));
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data.instances}
      pagination={false}
      loading={!data.instances}
    />
  );
};

export default InstanceList;