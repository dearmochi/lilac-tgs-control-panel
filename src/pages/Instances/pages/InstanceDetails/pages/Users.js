import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Spin, Tabs } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Text from 'antd/lib/typography/Text';
import React, { Fragment, useEffect, useState } from 'react';
import TgsInstanceRights from '../../../../../models/TgsInstanceRights';
import { cleanRuleName, hasRight } from '../../../../../utils/other';
import Tgs from '../../../../../utils/tgs';

const { TabPane } = Tabs;

const Users = ({ instanceId }) => {
  const [data, setData] = useState({ instanceUsers: null, selected: null });

  useEffect(() => {
    Tgs.get("InstanceUser/List", { "Instance": instanceId })
      .then(response =>
        Promise.all(response.data.map(instanceUser =>
          Tgs.get("User/" + instanceUser.userId)
            .then(userResponse => ({ ...instanceUser, ...userResponse.data }))
        )))
      .then(result => result.reduce((map, instanceUser) => (map[instanceUser.id] = instanceUser, map), {}))
      .then(result => setData(prevState => ({ ...prevState, instanceUsers: result })))
      .catch(error => {
        message.error("Failed to retrieve instance ID " + instanceId + " users. (" + error?.response?.status + ")");
      });
  }, []);

  return (
    <Spin spinning={!data.instanceUsers}>
      <Dropdown overlay={(
        <>
          <Menu
            selectable
            onSelect={({ key }) => {
              setData(prevState => ({ ...prevState, selected: data.instanceUsers[key] }));
            }}>
            {Object.values(data.instanceUsers || [])
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(instanceUser => (
                <Menu.Item key={instanceUser.id}>
                  {instanceUser.name}
                </Menu.Item>
              )
            )}
          </Menu>
        </>
      )}>
        <Button>
          {data.selected?.name || (
            <Text type="secondary">
              <UserOutlined /> Select User
            </Text>
          )}
          <DownOutlined />
        </Button>
      </Dropdown> 
      {data.selected && (
        <UserRights instanceUser={data.selected} />
      )}
    </Spin>
  );
};

export default Users;

const UserRights = ({ instanceUser }) => (
  <>
    <Divider orientation="left">{instanceUser.name + "'s Permissions"}</Divider>
    <Tabs tabPosition="left">
      {TgsInstanceRights.AllCategories.map(({name, key, rights}) => (
        <TabPane tab={name} key={key}>
          {Object.entries(rights).map(([right, rightName]) => (
            <Fragment key={right}>
              <Checkbox checked={hasRight(instanceUser, key, right)} disabled>
                {cleanRuleName(rightName)}
              </Checkbox>
              <br />
            </Fragment>
          ))}
        </TabPane>
      ))}
    </Tabs>
  </>
);