import { Button, Carousel, Col, Divider, Modal, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import roomApi from '../../apis/room';
import BackToHomeButton from '../../components/BackToHomeButton/BackToHomeButton';
import { commaMoneyAmount } from '../../helpers';
import useUser from '../../hooks/useUser';
import styles from './room-detail-page.module.scss';

const RoomDetailPage = () => {
  const { currentUser } = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const onClickBooking = () => {
    if (currentUser) {
      navigate('/checkout', { state: {} });
      return;
    }
    setOpenDialog(true);
  };

  const getRoom = async () => {
    try {
      setLoading(true);
      const res = await roomApi.getById(searchParams.get('id'));
      if (res.status === 200) {
        setRoom(res.data);
      }
    } catch (error) {
      console.err(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        <div className={styles.images}>
          <Carousel autoplay speed={1500}>
            {room?.images.map((image) => (
              <div key={image.id} className={styles.slide}>
                <img src={image.url} alt={room?.name} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.content}>
          <BackToHomeButton className={styles.backButton} />
          <Row gutter={54}>
            <Col span={14}>
              <div className={styles.name}>{room?.name}</div>
              <div className={styles.info}>
                <div>Type: {room?.name}</div>
                <div>Max number of children: {room?.childrenMax}</div>
                <div>Max number of adults: {room?.adultsMax}</div>
              </div>
              <div className={styles.description}>{room?.description}</div>
              <div className={styles.time}>
                <div className={styles.checkIn}>
                  <div>Check in</div>
                  <span>8:00 - 19:00</span>
                </div>
                <div className={styles.checkOut}>
                  <div>Check out</div>
                  <span>11:00 - 15:00</span>
                </div>
              </div>
              <Divider />
            </Col>
            <Col span={10}>
              <div className={styles.bookingForm}>
                <div className={styles.price}>${commaMoneyAmount(room?.price)}</div>
                <Divider />
                <Button
                  type="text"
                  size="large"
                  className={styles.bookingBtn}
                  onClick={onClickBooking}>
                  Book This Room!
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title="Do you want to login to booking this room?"
        open={openDialog}
        onOk={() => navigate('/login')}
        okButtonProps={{ type: 'text', className: styles.okButton }}
        onCancel={() => setOpenDialog(false)}
        okText="Of course!"
        cancelText="Stay"
        closable={false}
      />
    </Spin>
  );
};

export default RoomDetailPage;
