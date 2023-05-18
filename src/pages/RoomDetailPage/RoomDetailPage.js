import { Row } from 'antd';
import React from 'react';
import styles from './room-detail-page.module.scss';

const RoomDetailPage = () => {
    return (
        <div className={styles.container}>
             <div className={styles.images}></div>
             <Row className={styles.info}>
                <></>
             </Row>
        </div>
    );
};

RoomDetailPage.propTypes = {};

export default RoomDetailPage;