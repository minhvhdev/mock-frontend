import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Carousel,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Spin,
  message,
  notification
} from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roomApi from '../../apis/room';
import { slide1, slide2, slide3 } from '../../assets/images';
import RoomCard from '../../components/RoomCard/RoomCard';
import { WEBSITE_NAME } from '../../constants';
import styles from './home-page.module.scss';
import { useDispatch } from 'react-redux';
import { changeBookingDate } from '../../redux/slices/bookingDateSlice';
import moment from 'moment';

const convertDate = (date) => {
  const dateInput = new Date(date);
  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, '0');
  const day = String(dateInput.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const [selectedRange, setSelectedRange] = useState();
  const [maxAdults, setMaxAdults] = useState(0);
  const [maxChildren, setMaxChildren] = useState(0);

  const { RangePicker } = DatePicker;

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

  const getmaxAdults = async () => {
    try {
      const res = await roomApi.maxAdults();
      if (res.status === 200) {
        console.log(res.data);
        setMaxAdults(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getmaxChildren = async () => {
    try {
      const res = await roomApi.maxChildren();
      if (res.status === 200) {
        setMaxChildren(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
    dispatch(changeBookingDate(dates));
    navigate('/room-detail/2');
  };

  const formik = useFormik({
    initialValues: { adultsMax: null, childrenMax: null, startDate: '', endDate: '' },
    onSubmit: async (values) => {
      try {
        values.startDate = convertDate(selectedRange[0]);
        values.endDate = convertDate(selectedRange[1]);
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
    getmaxAdults();
    getmaxChildren();
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
          effect="fade"
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
                  <Form.Item label="Date">
                    <RangePicker
                      className={styles.rangePicker}
                      name="rangeDate"
                      size="large"
                      onChange={handleRangeChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Adults number">
                    <Input
                      type="number"
                      name="adultsMax"
                      size="large"
                      max={maxAdults}
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
                      max={maxChildren}
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
