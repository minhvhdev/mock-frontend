import { Carousel, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import roomApi from '../../apis/room';
import { slide1, slide2, slide3 } from '../../assets/images';
import RoomCard from '../../components/RoomCard/RoomCard';
import { WEBSITE_NAME } from '../../constants';
import styles from './home-page.module.scss';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const res = await roomApi.getAll();
      if (res.status === 200) {
        setRooms(res.data);
      }
    } catch (error) {
      console.err(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slideContainer}>
        <div className={styles.logo}>{WEBSITE_NAME}</div>
        <Carousel
          autoplay
          dots={false}
          autoplaySpeed={3500}
          pauseOnFocus={false}
          speed={2500}
          pauseOnHover={false}>
          <div className={styles.slide}>
            <img src={slide1} alt="slide1" />
          </div>
          <div className={styles.slide}>
            <img src={slide2} alt="slide1" />
          </div>
          <div className={styles.slide}>
            <img src={slide3} alt="slide1" />
          </div>
        </Carousel>
      </div>
      <div className={styles.roomsContainer}>
        <Row gutter={[20, 40]}>
          {rooms.map((room) => (
            <Col key={room.id} span={8}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default HomePage;
