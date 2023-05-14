import { Breadcrumb, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import styles from './home-page.module.scss';
import UserHeader from '../../components/UserHeader/UserHeader';

const HomePage = () => {
  return (
    <Layout className={styles.container}>
      <UserHeader />

      <Row justify="center">
        <Col span={22}>
          <Content>Content</Content>
        </Col>
      </Row>
    </Layout>
  );
};
export default HomePage;
