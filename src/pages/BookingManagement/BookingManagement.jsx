import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { bgHistory } from '../../assets/images';
import BookingTable from '../../components/BookingTable/BookingTable';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { BOOKING_STATUS_MENU_ITEM } from '../../constants';
import styles from './booking-management.module.scss';

const BookingManagement = () => {
  const [currentStatus, setCurrentStatus] = useState(BOOKING_STATUS_MENU_ITEM[0].key);

  const onClick = (event) => {
    setCurrentStatus(event.key);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerImg}>
        <img src={bgHistory} alt="bgHistory" />
      </div>
      <div className={styles.content}>
        <Breadcrumb currentPage="Booking management" />
        <Row wrap={false} gutter={50}>
          <Col>
            <Menu
              onClick={onClick}
              style={{
                width: 256
              }}
              defaultSelectedKeys={['booked']}
              mode="inline"
              items={BOOKING_STATUS_MENU_ITEM}
            />
          </Col>
          <Col>
            <BookingTable currentStatus={currentStatus} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookingManagement;
