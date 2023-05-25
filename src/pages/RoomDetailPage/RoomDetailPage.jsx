import {
  faBanSmoking,
  faMountainSun,
  faMugSaucer,
  faUtensils,
  faWifi,
  faWind
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Carousel, Col, DatePicker, Divider, Input, Modal, Row, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import bookingApi from '../../apis/booking';
import roomApi from '../../apis/room';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { commaMoneyAmount } from '../../helpers';
import useUser from '../../hooks/useUser';
import styles from './room-detail-page.module.scss';
import { useSelector } from 'react-redux';

const generateOptionPerson = (number) => {
  const result = [];
  for (let i = 0; i <= number; i++) {
    result.push({ label: i, value: i });
  }
  return result;
};

const { RangePicker } = DatePicker;

const RoomDetailPage = () => {
  const bookingDate = useSelector((state) => state.bookingDate);
  const { currentUser } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRange, setSelectedRange] = useState();
  const [personNumber, setPersonNumber] = useState({ adults: 0, children: 0 });

  const submitBooking = async () => {
    try {
      setSubmitting(true);
      await bookingApi.create(); // TODO change data
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onClickBooking = () => {
    if (currentUser) {
      submitBooking();
      return;
    }
    setOpenDialog(true);
  };

  const onOkModal = () => {
    navigate('/login', { state: { selectedRange, personNumber } });
  };

  const handleChange = (value, type) => {
    if (type === 'adults') {
      setPersonNumber((prevState) => ({
        ...prevState,
        adults: value
      }));
    } else if (type === 'children') {
      setPersonNumber((prevState) => ({
        ...prevState,
        children: value
      }));
    }
  };

  const renderPersonForm = () => {
    const totalPersons = personNumber.adults + personNumber.children;
    const inputElements = [];

    for (let i = 0; i < totalPersons; i++) {
      inputElements.push(
        <Input key={i} style={{ width: '100%', marginBottom: '10px ' }} placeholder="Full name" />
      );
    }

    return (
      <div
        className={styles.personForm}
        style={totalPersons > 0 ? { display: 'block' } : { display: 'none' }}>
        {inputElements}
      </div>
    );
  };

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };

  const calculateDateRange = () => {
    if (selectedRange && selectedRange[0] && selectedRange[1]) {
      const start = selectedRange[0].startOf('day');
      const end = selectedRange[1].startOf('day');
      const diffInDays = end.diff(start, 'days');
      return {
        diffInDays: diffInDays,
        total: room?.price * diffInDays
      };
    }
    return 0;
  };

  const getRoom = async () => {
    try {
      setLoading(true);
      const res = await roomApi.getById(id);
      if (res.status === 200) {
        setRoom(res.data);
      }
    } catch (error) {
      console.error(error);
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
                <img src={image.imageUrl} alt={room?.name} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.content}>
          <Breadcrumb currentPage="Room detail" />
          <Row gutter={54}>
            <Col span={14}>
              <div className={styles.name}>{room?.name}</div>
              <div className={styles.info}>
                <div>Type: {room?.type}</div>
                <div>Max number of children: {room?.childrenMax}</div>
                <div>Max number of adults: {room?.adultsMax}</div>
              </div>
              <div className={styles.description}>{room?.description}</div>
              <div className={styles.time}>
                <div className={styles.checkIn}>
                  <div>Check in</div>
                  <span>14:00 - 17:00</span>
                </div>
                <div className={styles.checkOut}>
                  <div>Check out</div>
                  <span>11:00 - 14:00</span>
                </div>
              </div>
              <Divider />
              <div className={styles.services}>
                <Row className={styles.serviceRow}>
                  <Col className={styles.serviceItem} span={12}>
                    <FontAwesomeIcon icon={faWifi} />
                    <span className={styles.itemContext}>Wifi</span>
                  </Col>
                  <Col className={styles.serviceItem} span={12}>
                    <FontAwesomeIcon icon={faUtensils} />
                    <span className={styles.itemContext}>Breakfast</span>
                  </Col>
                </Row>
                <Row className={styles.serviceRow}>
                  <Col className={styles.serviceItem} span={12}>
                    <FontAwesomeIcon icon={faMugSaucer} />
                    <span className={styles.itemContext}>Wifi</span>
                  </Col>
                  <Col className={styles.serviceItem} span={12}>
                    <FontAwesomeIcon icon={faWind} />
                    <span className={styles.itemContext}>Air Conditioner</span>
                  </Col>
                </Row>
                <Row className={styles.serviceRow}>
                  <Col className={styles.serviceItem} span={12}>
                    <FontAwesomeIcon icon={faBanSmoking} />
                    <span className={styles.itemContext}>No Smoking</span>
                  </Col>
                  <Col className={styles.serviceItem} span={12}>
                    <FontAwesomeIcon icon={faMountainSun} />
                    <span className={styles.itemContext}>Great view</span>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={10}>
              <div className={styles.bookingForm}>
                <div
                  className={styles.personInBooking}
                  style={currentUser ? { display: '' } : { display: 'none' }}>
                  <div className={styles.personCount}>
                    <div className={styles.title}>Information of people living with</div>
                    <Row justify="space-between">
                      <Col span={10}>
                        <Row justify="space-around" align="middle">
                          <Col span={8}>
                            <span>Adults:</span>
                          </Col>
                          <Col span={8}>
                            <Select
                              defaultValue={0}
                              style={{ width: 55 }}
                              onChange={(value) => handleChange(value, 'adults')}
                              options={generateOptionPerson(room?.adultsMax)}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={10}>
                        <Row justify="space-around" align="middle">
                          <Col span={10}>
                            <span htmlFor="">Children:</span>
                          </Col>
                          <Col span={10}>
                            <Select
                              defaultValue={0}
                              style={{ width: 55 }}
                              onChange={(value) => handleChange(value, 'children')}
                              options={generateOptionPerson(room?.childrenMax)}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  {renderPersonForm()}
                  <Divider />
                </div>
                <Row className={styles.labelParent} justify="space-around" align="middle">
                  <Col className={styles.label} span={11}>
                    Check in
                  </Col>
                  <Col className={styles.label} span={11}>
                    Check out
                  </Col>
                </Row>
                <RangePicker
                  className={styles.rangePicker}
                  size="large"
                  disabled={bookingDate[0]}
                  onChange={handleRangeChange}
                  value={selectedRange || bookingDate}
                />
                <Row
                  className={styles.totalPrice}
                  justify="space-between"
                  align="middle"
                  style={selectedRange ? { display: 'flex' } : { display: 'none' }}>
                  <Col span={12}>
                    ${commaMoneyAmount(room?.price)} x {calculateDateRange().diffInDays} night(s)
                  </Col>
                  <Col className={styles.total} span={4}>
                    ${calculateDateRange().total}
                  </Col>
                </Row>
                <Divider />
                <Spin spinning={submitting}>
                  <Button
                    type="text"
                    size="large"
                    className={styles.bookingBtn}
                    onClick={onClickBooking}>
                    Book This Room!
                  </Button>
                </Spin>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        title="Do you want to login to booking this room?"
        open={openDialog}
        onOk={onOkModal}
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
