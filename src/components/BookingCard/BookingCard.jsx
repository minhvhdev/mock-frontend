import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './booking-card.module.scss';
import moment from 'moment/moment';
import { Button, Col, Row } from 'antd';
import bookingApi from '../../apis/booking';

const BookingCard = ({ booking }) => {
  const onClickStatusButton = async () => {
    try {
      bookingApi.update(booking.id, statusLabel);
    } catch (error) {}
  };

  const statusLabel = useMemo(() => {
    switch (booking.status) {
      case 'Booked':
        return 'Check in';
      case 'Checked in':
        return 'Check out';
      default:
        return '';
    }
  }, [booking.status]);
  return (
    <div className={styles.container}>
      <Row wrap={false} gutter={5}>
        {booking.room.images.map((image, index) => (
          <Col key={image.id}>
            <img src={image.imageUrl} alt="" />
          </Col>
        ))}
      </Row>
      <div className={styles.name}>{booking.room.name}</div>
      <div className={styles.date}>
        <div>
          <div>Check in date</div>
          <span>{moment(booking.checkInDate).format('DD/MM/YYY')}</span>
        </div>
        <div>
          <div>Check out date</div>
          <span>{moment(booking.checkOutDate).format('DD/MM/YYY')}</span>
        </div>
      </div>
      <div>Adult number: {booking.adultsNumber}</div>
      <div>Children number:{booking.childrenNumber}</div>
      <div className={styles.statusButton}>
        {booking.status === 'Booked' && (
          <Button type="primary" danger>
            Cancel
          </Button>
        )}
        {statusLabel && (
          <Button type="primary" onClick={onClickStatusButton}>
            {statusLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
BookingCard.propTypes = {
  booking: PropTypes.object.isRequired
};

export default BookingCard;
