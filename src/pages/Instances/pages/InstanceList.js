import { message, Table, Tag } from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import Monospace from '../../../components/Monospace';

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
  const match = useRouteMatch();

  // State.
  const [data, setData] = useState({ instances: null });

  // Get instances from API.
  useEffect(() => {
    // Make the request.
    Axios.get(process.env.LILAC_TGS_API_URL + "Instance/List", {
      headers: {
        "Api": process.env.LILAC_TGS_API_VERSION,
        "Authorization": "Bearer " + sessionStorage.getItem("bearerToken"),
      },
    })
      .then(response => {
        const parsedData = response.data.map((entry, i) => ({
          ...entry, 
          key: i,
          url: match.url + "/" + entry.id,
        }));
        // Update our state.
        setData(prevState => ({ ...prevState, instances: parsedData }));
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