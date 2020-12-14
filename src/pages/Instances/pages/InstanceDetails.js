import { ApiOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Row, Statistic } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreadcrumbHint from '../../../components/BreadcrumbHint';
import Monospace from '../../../components/Monospace';
import Tgs from '../../../utils/tgs';

const InstanceDetails = () => {
  const { id } = useParams();

  // State.
  const [data, setData] = useState({ instance: null, grantingPerms: false });

  // Get instances from API.
  useEffect(() => {
    // Make the request.
    Tgs.get("Instance/" + id)
      .then(response => {
        // Update our state.
        setData(prevState => ({ ...prevState, instance: response.data }));
      })
      .catch(error => message.error("Failed to retrieve instance ID " + id + ". (" + error.response.status + ")"));
  }, []);

  return (
    <>
      <BreadcrumbHint path={"/instances/" + id} name="Instance Details" />
      <Card
        title="Instance"
        extra={(
          <>
            <Button type="danger" icon={<ApiOutlined />}>
              Detach
            </Button>
            <Button
              type="primary"
              className="ml-1"
              icon={<UserAddOutlined />}
              onClick={() => confirm({
                title: "Do you want to grant the current user full permissions for this instance?",
                icon: <ExclamationCircleOutlined />,
              })}>
              Grant permissions on this instance
            </Button>
          </>
        )}>
        <Row>
          <Col span="2">
            <Statistic 
              title="ID"
              value={data.instance?.id}
              loading={!data.instance}
            />
          </Col>
          <Col span="6">
            <Statistic 
              title="Name" 
              value={data.instance?.name} 
              loading={!data.instance}
              suffix={(
                <Link to="/">
                  <EditOutlined />
                </Link>
              )}
            />
          </Col>
          <Col span="8">
            <Statistic
              title="Path"
              value={data.instance?.path}
              loading={!data.instance}
              formatter={path => <Monospace>{path}</Monospace>}
              suffix={(
                <Link to="/">
                  <EditOutlined />
                </Link>
              )}
            />
          </Col>
          <Col span="4">
            <Statistic
              title="Chat Bot Limit"
              value={data.instance?.chatBotLimit}
              loading={!data.instance}
              suffix={(
                <Link to="/">
                  <EditOutlined />
                </Link>
              )}
            />
          </Col>
          <Col span="4">
            <Statistic
              title="Status"
              value={data.instance?.online}
              loading={!data.instance}
              formatter={online => (
                <Text type={online ? "success" : "danger"}>
                  {online ? "Online" : "Offline"}
                </Text>
              )}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default InstanceDetails;