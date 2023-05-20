import { SearchOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Form, Input, Row, Select, Spin } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import roomApi from '../../apis/room';
import { slide1, slide2, slide3 } from '../../assets/images';
import RoomCard from '../../components/RoomCard/RoomCard';
import { WEBSITE_NAME } from '../../constants';
import styles from './home-page.module.scss';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [searching, setSearching] = useState(false);

  const getRooms = async () => {
    try {
      setSearching(true);
      const res = await roomApi.getAll();
      if (res.status === 200) {
        setRooms(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const getTypeOptions = async () => {
    try {
      const res = await roomApi.getTypeOptions();
      if (res.status === 200) {
        setTypeOptions(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: { type: '', adultsMax: 1, childrenMax: 0 },
    onSubmit: async (values) => {
      try {
        setSearching(true);
        const res = await roomApi.search(values);
        if (res.status === 200) {
          setRooms(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSearching(false);
      }
    }
  });

  useEffect(() => {
    getRooms();
    getTypeOptions();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slideContainer}>
        <div className={styles.logo}>{WEBSITE_NAME}</div>
        <Carousel
          autoplay
          dots={false}
          autoplaySpeed={5000}
          pauseOnFocus={false}
          speed={2500}
          effect='fade'
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
        <div className={styles.search}>
          <Spin spinning={searching}>
            <Form layout="vertical" onFinish={formik.handleSubmit} className={styles.form}>
              <Row justify="space-around" align="middle" gutter={30}>
                <Col span={10}>
                  <Form.Item label="Room type">
                    <Select
                      name="type"
                      size="large"
                      className={styles.select}
                      options={typeOptions.map((option) => ({
                        value: option,
                        label: option
                      }))}
                      onChange={formik.handleChange}
                      value={formik.values.adultsMax}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Adults number">
                    <Input
                      type="number"
                      name="adultsMax"
                      size="large"
                      max={5}
                      min={0}
                      onChange={formik.handleChange}
                      value={formik.values.adultsMax}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Children number">
                    <Input
                      type="number"
                      name="childrenMax"
                      size="large"
                      max={5}
                      min={0}
                      onChange={formik.handleChange}
                      value={formik.values.childrenMax}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Button
                    htmlType="submit"
                    size="large"
                    type="default"
                    icon={<SearchOutlined />}
                    className={styles.button}>
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        </div>
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
