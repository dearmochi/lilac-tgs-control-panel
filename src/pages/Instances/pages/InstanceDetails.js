import { ApiOutlined, BranchesOutlined, CloudDownloadOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, FileOutlined, FlagOutlined, MessageOutlined, SettingOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, PageHeader, Row, Space, Spin, Statistic, Tabs, Tag } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import confirm from 'antd/lib/modal/confirm';
import Text from 'antd/lib/typography/Text';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreadcrumbHint from '../../../components/BreadcrumbHint';
import Monospace from '../../../components/Monospace';
import TgsInstanceRights from '../../../models/TgsInstanceRights';
import { cleanRuleName, iconText } from '../../../utils/other';
import Tgs from '../../../utils/tgs';

const { TabPane } = Tabs;

const InstanceDetails = () => {
  const { id } = useParams();

  // State.
  const [data, setData] = useState({ instance: null, instanceUser: null, grantingPerms: false });

  // Get instances from API.
  useEffect(() => {
    // Make the request.
    Tgs.get("Instance/" + id)
      .then(response => {
        setData(prevState => ({ ...prevState, instance: response.data }));
        return Tgs.get("InstanceUser", { "Instance": id });
      })
      .then(response => setData(prevState => ({ ...prevState, instanceUser: response.data })))
      .catch(error => message.error("Failed to retrieve instance ID " + id + ". (" + error.response.status + ")"));
  }, []);

  return (
    <>
      <BreadcrumbHint path={"/instances/" + id} name="Instance Details" />
      <InstanceHeader data={data} />
      <InstanceBody data={data} />
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
          title="Status"
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

const InstanceBody = ({ data }) => (
  <Card type="inner" bordered={false}>
    <Tabs className="mb-1">
      <TabPane tab={iconText(FlagOutlined, "Your Permissions")} key="0">
        <Tabs tabPosition="left">
          {TgsInstanceRights.AllCategories.map(({name, key, rights}) => (
            <TabPane tab={name} key={key}>
              <Spin spinning={!data.instanceUser}>
                {Object.entries(rights).map(([i, rightName]) => (
                  <Fragment key={i}>
                    <Checkbox checked={data.instanceUser?.[key] & i} disabled>
                      {cleanRuleName(rightName)}
                    </Checkbox>
                    <br />
                  </Fragment>
                ))}
                </Spin>
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
      <TabPane tab={iconText(TeamOutlined, "Users")} key="1" />
      <TabPane tab={iconText(BranchesOutlined, "Repository")} key="2" />
      <TabPane tab={iconText(FileOutlined, "BYOND")} key="3" />
      <TabPane tab={iconText(CloudDownloadOutlined, "Deployment")} key="4" />
      <TabPane tab={iconText(EyeOutlined, "Dream Daemon")} key="5" />
      <TabPane tab={iconText(MessageOutlined, "Chatbots")} key="6" />
      <TabPane tab={iconText(SettingOutlined, "Configuration")} key="7" />
    </Tabs>
    <Text type="secondary">
      To receive more permissions, press the &quot;Grant all permissions on this instance to self&quot; button at the top.
    </Text>
  </Card>
);