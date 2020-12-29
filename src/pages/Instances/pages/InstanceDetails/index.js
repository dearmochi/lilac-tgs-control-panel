import { ApiOutlined, BranchesOutlined, CloudDownloadOutlined, DeploymentUnitOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, MessageOutlined, SettingOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, PageHeader, Row, Space, Statistic, Tabs, Tag } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreadcrumbHint from '../../../../components/BreadcrumbHint';
import Monospace from '../../../../components/Monospace';
import store, { add as instanceJobsAdd, init as instanceJobsInit } from '../../../../store';
import { iconText } from '../../../../utils/other';
import Tgs from '../../../../utils/tgs';
import JobsDrawer from './JobsDrawer';
import DreamDaemon from './pages/DreamDaemon';
import Users from './pages/Users';

const { TabPane } = Tabs;

const InstanceDetails = () => {
  const { id } = useParams();

  // State.
  const [data, setData] = useState({ instance: null, instanceUser: null, grantingPerms: false, instanceUpdate: 0 });

  useEffect(() => {
    store.dispatch(instanceJobsInit());
  }, []);

  // Get instances from API.
  useEffect(() => {
    // Make the request.
    Tgs.get("Instance/" + id)
      .then(({ data }) => {
        const jobs = [data.activeCompileJob?.job, data.stagedCompileJob?.job].filter(job => !!job);
        if (jobs.length > 0) {
          store.dispatch(instanceJobsAdd(jobs));
        }

        setData(prevState => ({ ...prevState, instance: data }));
        return Tgs.get("InstanceUser", { "Instance": id });
      })
      .then(({ data }) => setData(prevState => ({ ...prevState, instanceUser: data })))
      .catch(error => message.error("Failed to retrieve instance ID " + id + ". (" + error.response.status + ")"));
  }, [data.instanceUpdate]);

  return (
    <>
      <BreadcrumbHint path={"/instances/" + id} name="Instance Details" />
      <JobsDrawer
        instanceId={id} 
        onJobComplete={
          _ => {
            setData(prevState => ({ ...prevState, instanceUpdate: prevState.instanceUpdate + 1 }));
          }
        }
      />
      <InstanceHeader
        data={data}
        instanceUpdate={data.instanceUpdate}
      />
      <InstanceBody
        instanceId={id}
        instanceUpdate={data.instanceUpdate}
        data={data}
      />
    </>
  );
};

export default InstanceDetails;

const InstanceHeader = ({ data }) => (
  <PageHeader
    title={data.instance?.name}
    ghost={false}
    onBack={() => window.history.back()}  
    extra={(
      <Space>
        <Button type="danger" icon={<ApiOutlined />}>
          Detach
        </Button>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => confirm({
            title: "Do you want to grant the current user full permissions for this instance?",
            icon: <ExclamationCircleOutlined />,
          })}>
          Grant all permissions on this instance to self
        </Button>
      </Space>
    )}>
    <Row>
      <Col span="2">
        <Statistic 
          title="ID"
          value={data.instance?.id}
          loading={!data.instance}
        />
      </Col>
      <Col span="12" offset="1">
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
      <Col span="8" offset="1">
        <Statistic
          title="Instance Status"
          value={data.instance?.online}
          loading={!data.instance}
          formatter={online => (
            <Tag color={online ? "green" : "red"} style={{ fontSize: "24px", lineHeight: "32px" }}>
              {online ? "Online" : "Offline"}
            </Tag>
          )}
        />
      </Col>
    </Row>
  </PageHeader>
);

const InstanceBody = ({ data, ...rest }) => (
  <Card type="inner" bordered={false}>
    <Tabs className="mb-1">
      <TabPane tab={iconText(TeamOutlined, "Users")} key="1">
        <Users
          currentUser={data.instanceUser}
          {...rest}
        />
      </TabPane>
      <TabPane tab={iconText(BranchesOutlined, "Repository")} key="2" />
      <TabPane tab={iconText(DeploymentUnitOutlined, "BYOND")} key="3" />
      <TabPane tab={iconText(CloudDownloadOutlined, "Deployment")} key="4" />
      <TabPane tab={iconText(EyeOutlined, "Dream Daemon")} key="5">
        <DreamDaemon {...rest} />
      </TabPane>
      <TabPane tab={iconText(MessageOutlined, "Chatbots")} key="6" />
      <TabPane tab={iconText(SettingOutlined, "Configuration")} key="7" />
    </Tabs>
  </Card>
);