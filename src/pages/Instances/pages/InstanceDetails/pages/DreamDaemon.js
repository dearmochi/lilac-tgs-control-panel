import { FileAddOutlined, LoginOutlined, PlayCircleOutlined, ReloadOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputNumber, message, Radio, Row, Space, Statistic, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { getGracefulAction, getSecurityLevelName, getStatus } from '../../../../../models/DreamDaemon';
import Tgs from '../../../../../utils/tgs';

const DreamDaemon = ({ instanceId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Tgs.get("DreamDaemon", { "Instance": instanceId })
      .then(response => setData(response.data))
      .catch(error => {
        message.error("Failed to retrieve instance ID " + instanceId + " daemon status. (" + error?.response?.status + ")");
      });
  });

  return (
    <>
      <Row>
        <Col span="3">
          <Statistic
            title="Dream Daemon Status"
            value={getStatus(data?.status)}
            formatter={online => (
              <Tag color={online.color}>
                {online.text}
              </Tag>
            )}
          />
        </Col>
        <Col span="6">
          <Statistic
            title="Port"
            value={data?.port}
            groupSeparator=""
          />
        </Col>
        <Col span="5">
          <Statistic
            title="Security Level"
            value={getSecurityLevelName(data?.securityLevel)}
          />
        </Col>
        <Col span="5">
          <Statistic
            title="Web Client Allowed"
            value={data?.allowWebClient}
            formatter={value => (
              <Tag color={value ? "green" : "red"}>
                {value ? "Yes" : "No"}
              </Tag>
            )}
          />
        </Col>
        <Col span="5">
          <Statistic
            title="Graceful Action"
            value={data && getGracefulAction(data) || "None"}
          />
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Divider orientation="left">Settings</Divider>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <Form.Item label="Port" name="port">
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Allow web client connections"
              name="webclient">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </Form.Item>
            <Form.Item
              label="Automatically start server with instance"
              name="autostart">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </Form.Item>
            <Form.Item
              label="Launch inactivity timeout period"
              name="inactivity"
              help="In seconds">
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Heartbeat"
              name="heartbeat"
              help="0 to disable, in seconds">
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Byond topic timeout"
              name="topic"
              help="In milliseconds">
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Additional parameters"
              name="params">
              <Input />
            </Form.Item>
            <Form.Item
              label="Security level"
              name="params"
              help="The minimum security level specified in deployments can override this setting">
              <Radio.Group>
                <Radio>Ultrasafe</Radio>
                <Radio>Safe</Radio>
                <Radio>Trusted</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Graceful action"
              name="params"
              help="The watchdog action that will be taken when /world/Reboot is called">
              <Radio.Group>
                <Radio>None</Radio>
                <Radio>Restart</Radio>
                <Radio>Shutdown</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              className="mt-1"
              wrapperCol={{ offset: 8 }}>
              <Button type="primary">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col offset="1" span="11">
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Button type="primary">
              <PlayCircleOutlined /> Start server
            </Button>
            <Button>
              <ReloadOutlined /> Restart server
            </Button>
            <Button danger>
              <StopOutlined /> Stop server
            </Button>
          </Space>
          <Space className="mt-1">
            <Button>
              <FileAddOutlined /> Create process dump
            </Button>
            <Button>
              <LoginOutlined /> Connect to server
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default DreamDaemon;