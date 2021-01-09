import { FileAddOutlined, PlayCircleOutlined, ReloadOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputNumber, message, Radio, Row, Space, Spin, Statistic, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { default as Defines, getGracefulAction, getSecurityLevelName, getStatus } from '../../../../../models/DreamDaemon';
import store, { add as instanceJobsAdd } from '../../../../../store';
import { messageTgsError } from '../../../../../utils/other';
import Tgs from '../../../../../utils/tgs';

const DreamDaemon = ({ instanceId, instanceUpdate }) => {
  const [data, setData] = useState({ daemon: null, updates: 0 });

  // Updates the Dream Daemon model with the given form.
  const updateDreamDaemon = form => {
    const values = form.getFieldsValue();
    const newDaemon = {
      ...data.daemon,
      // Form overrides
      port: values.port,
      allowWebClient: values.webclient,
      autoStart: values.autostart,
      startupTimeout: values.inactivity,
      heartbeatSeconds: values.heartbeat,
      topicRequestTimeout: values.topic,
      additionalParams: values.params,
      securityLevel: values.security,
      // Snowflake: graceful action
      softRestart: values.graceful == 1,
      softShutdown: values.graceful == 2,
    };
    
    return Tgs.post("DreamDaemon", newDaemon, { "Instance": instanceId })
      .then(({ data }) => {
        setData(prevState => ({ ...prevState, daemon: data }));
        message.success("Successfully updated daemon settings for instance ID " + instanceId + ". Changes will take effect next reboot.")
      })
      .catch(error => messageTgsError(error, "save daemon settings for instance " + instanceId));
  };

  // Get the initial state
  useEffect(() => {
    Tgs.get("DreamDaemon", { "Instance": instanceId })
      .then(({ data }) => setData(prevState => ({ ...prevState, daemon: data })))
      .catch(error => messageTgsError(error, "fetch daemon settings for instance " + instanceId))
  }, [data.updates, instanceUpdate]);

  return (
    <>
      <DaemonStatus daemon={data.daemon} />
      <Row>
        <Col span="12">
          <Divider orientation="left">Settings</Divider>
          <DaemonSettings
            daemon={data.daemon}
            onSubmit={form => updateDreamDaemon(form)}
          />
        </Col>
        <Col offset="1" span="11">
          <Divider orientation="left">Actions</Divider>
          <DaemonActions
            daemon={data.daemon}
            instanceId={instanceId}
            onAction={() => setData(prevState => ({ ...prevState, updates: prevState.updates + 1 }))}
          />
        </Col>
      </Row>
    </>
  );
};
export default DreamDaemon;

const DaemonStatus = ({ daemon }) => (
  <Row>
    <Col span="3">
      <Statistic
        title="Dream Daemon Status"
        loading={!daemon}
        value={getStatus(daemon?.status)}
        formatter={online => (
          <Tag color={online.color}>
            {online.text}
          </Tag>
        )}
      />
    </Col>
    <Col offset="1" span="5">
      <Statistic
        title="Current Port"
        loading={!daemon}
        value={daemon?.status != Defines.Status.Offline && daemon?.currentPort || "N/A"}
        groupSeparator=""
      />
    </Col>
    <Col offset="1" span="4">
      <Statistic
        title="Current Security Level"
        loading={!daemon}
        value={getSecurityLevelName(daemon?.currentSecurity)}
      />
    </Col>
    <Col offset="1" span="4">
      <Statistic
        title="Web Client Currently Allowed"
        loading={!daemon}
        value={daemon?.currentAllowWebclient}
        formatter={value => 
          daemon?.status != Defines.Status.Offline ? (
            <Tag color={value ? "green" : "red"}>
              {value ? "Yes" : "No"}
            </Tag>
          ) : "N/A"
        }
      />
    </Col>
    <Col offset="1" span="4">
      <Statistic
        title="Graceful Action on Shutdown"
        loading={!daemon}
        value={getGracefulAction(daemon)}
      />
    </Col>
  </Row>
);

const DaemonSettings = ({ daemon, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // Populate the form
  useEffect(() => {
    if (!daemon) {
      return;
    }

    // Snowflake for graceful action, which uses softRestart and softShutdown
    let gracefulValue = 0;
    if (daemon.softRestart) {
      gracefulValue = 1;
    } else if (daemon.softShutdown) {
      gracefulValue = 2;
    }

    form.setFieldsValue({
      port: daemon.port,
      webclient: daemon.allowWebClient,
      autostart: daemon.autoStart,
      inactivity: daemon.startupTimeout,
      heartbeat: daemon.heartbeatSeconds,
      topic: daemon.topicRequestTimeout,
      params: daemon.additionalParams,
      security: daemon.securityLevel,
      graceful: gracefulValue,
    });
  }, [daemon]);

  return (
    <Spin spinning={!daemon}>
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onSubmitCapture={() => {
          setSubmitting(true);
          onSubmit(form)
            .finally(_ => setSubmitting(false));
        }}>
        <Form.Item label="Port" name="port">
          <InputNumber min={0} max={65353} />
        </Form.Item>
        <Form.Item
          label="Allow web client connections"
          name="webclient"
          valuePropName="checked">
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Form.Item>
        <Form.Item
          label="Automatically start server with instance"
          name="autostart"
          valuePropName="checked">
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Form.Item>
        <Form.Item
          label="Launch inactivity timeout period"
          name="inactivity"
          help="In seconds">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Heartbeat"
          name="heartbeat"
          help="0 to disable, in seconds">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Byond topic timeout"
          name="topic"
          help="In milliseconds">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Additional parameters"
          name="params">
          <Input maxLength={10000} />
        </Form.Item>
        <Form.Item
          label="Security level"
          name="security"
          help="The minimum security level specified in deployments can override this setting">
          <Radio.Group>
            <Radio value={0}>Trusted</Radio>
            <Radio value={1}>Safe</Radio>
            <Radio value={2}>Ultrasafe</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Graceful action"
          name="graceful"
          help="The watchdog action that will be taken when /world/Reboot is called">
          <Radio.Group>
            <Radio value={0}>None</Radio>
            <Radio value={1}>Restart</Radio>
            <Radio value={2}>Shutdown</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="mt-1"
          wrapperCol={{ offset: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const DaemonActions = ({ daemon, instanceId, onAction }) => {
  const [inProgress, setInProgress] = useState(false);

  // Blocks off buttons while the action is being done
  const doAction = func => {
    setInProgress(true);
    func()
      .finally(() => setInProgress(false));
  };

  /**
   * Starts the server.
   */
  const startServer = () => {
    return Tgs.put("DreamDaemon", {}, { "Instance": instanceId })
      .then(({ data }) => {
        store.dispatch(instanceJobsAdd([data]));
        message.success("Instance " + instanceId + " started.");
        onAction();
      })
      .catch(error => messageTgsError(error, "start instance " + instanceId + "."));
  };

  /**
   * Restarts the server.
   */
  const restartServer = () => {
    return Tgs.patch("DreamDaemon", {}, { "Instance": instanceId })
      .then(({ data }) => {
        store.dispatch(instanceJobsAdd([data]));
        message.success("Instance " + instanceId + " restarted.");
        onAction();
      })
      .catch(error => messageTgsError(error, "restart instance " + instanceId + "."));
  };

  /**
   * Stops the server.
   */
  const stopServer = () => {
    return Tgs.delete("DreamDaemon", { "Instance": instanceId })
      .then(_ => {
        message.success("Instance " + instanceId + " shut down.");
        onAction();
      })
      .catch(error => messageTgsError(error, "shut down instance " + instanceId + "."));
  };

  return (
    <>
      <Space>
        <Button
          type="primary"
          disabled={inProgress || daemon?.status != Defines.Status.Offline}
          onClick={() => doAction(startServer)}>
          <PlayCircleOutlined /> Start server
        </Button>
        <Button
          disabled={inProgress || daemon?.status == Defines.Status.Offline}
          onClick={() => doAction(restartServer)}>
          <ReloadOutlined /> Restart server
        </Button>
        <Button
          danger
          disabled={inProgress || daemon?.status == Defines.Status.Offline}
          onClick={() => doAction(stopServer)}>
          <StopOutlined /> Stop server
        </Button>
        <Button disabled={daemon?.status == Defines.Status.Offline}>
          <FileAddOutlined /> Create process dump
        </Button>
      </Space>
    </>
  );
};