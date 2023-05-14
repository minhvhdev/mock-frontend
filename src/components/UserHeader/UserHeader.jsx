import React from 'react';
import { Layout, Input, AutoComplete, Menu, Dropdown, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './user-header.module.scss';
import { WEBSITE_NAME } from '../../constants';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const { Header } = Layout;
const { Search } = Input;

const menuUnLogin = (
  <Menu>
    <Menu.Item>
      <Link to="/login">Sign In</Link>
    </Menu.Item>
    <Menu.Item>
      <Link href="/register">Sign Up</Link>
    </Menu.Item>
  </Menu>
);
const menuLogged = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">Profile</Link>
    </Menu.Item>
  </Menu>
);

const UserHeader = () => {
  const { currentUser } = useUser();

  const options = [
    {
      value: 'Option1'
    },
    {
      value: 'Option2'
    }
  ];
  return (
    <Header className={styles.header}>
      <Row justify="center">
        <Col span={22}>
          <div className={styles.content}>
            <div className={styles.logo}>{WEBSITE_NAME}</div>
            <AutoComplete options={options} size="large" className={styles.search}>
              <Search placeholder="Search" />
            </AutoComplete>
            <Dropdown overlay={currentUser ? menuLogged : menuUnLogin}>
              <span className={styles.dropdown} onClick={(e) => e.preventDefault()}>
                <UserOutlined />
              </span>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default UserHeader;
