import React, { useEffect, useState } from 'react';
import styles from './booking-management.module.scss';
import bookingApi from '../../apis/booking';
import useUser from '../../hooks/useUser';
import { Col, Menu, Row, Spin } from 'antd';
import BookingCard from '../../components/BookingCard/BookingCard';
import { bgHistory } from '../../assets/images';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const BOOKING_STATUS_MENU_ITEM = [
  { label: 'Booked', key: 'booked' },
  {
    label: 'Check in',
    key: 'check in'
  },
  {
    label: 'Check out',
    key: 'check out'
  }
];

const BookingManagement = () => {
  const { currentUser } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const onClick = (event) => {
    getBookings(event.key);
  };

  const getBookings = async (status) => {
    try {
      setLoading(true);
      const res = await bookingApi.getByUser(currentUser.id, status);
      if (res.status === 200) {
        setBookings(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings('booked');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerImg}>
        <img src={bgHistory} alt="bgHistory" />
      </div>
      <Spin spinning={loading}>
        <div className={styles.content}>
          <Breadcrumb currentPage="Booking management" />
          <Row>
            <Col span={7}>
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
            <Col span={17}>
              <Row gutter={[0, 20]}>
                {bookings.map((booking) => (
                  <Col span={24} key={booking.id}>
                    <BookingCard booking={booking} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default BookingManagement;
