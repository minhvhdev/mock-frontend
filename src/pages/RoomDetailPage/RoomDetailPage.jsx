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
import moment from 'moment';

const generateOptionPerson = (number) => {
  const result = [];
  for (let i = 0; i <= number; i++) {
    result.push({ label: i, value: i });
  }
  return result;
};

const convertDate = (date) => {
  const dateInput = new Date(date);
  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, '0');
  const day = String(dateInput.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
  const [selectedRange, setSelectedRange] = useState(bookingDate);
  const [personNumber, setPersonNumber] = useState({ adultsNumber: 0, childrenNumber: 0 });
  const [dataBooking, setDataBooking] = useState({
    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    room: {
      id: id
    },
    price: '',
    checkInDate: convertDate(selectedRange[0]),
    checkOutDate: convertDate(selectedRange[1]),
    adultsNumber: 0,
    childrenNumber: 0,
    status: 'booked',
    personList: []
  })

  const submitBooking = async () => {
    try {
      setSubmitting(true);
      console.log(dataBooking);
      // await bookingApi.create(); // TODO change data
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
    navigate('/login', { state: { personNumber } });
  };

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
    if (dates && dates[0] && dates[1]) {
      setDataBooking((prevState) => ({
        ...prevState,
        checkInDate: convertDate(dates[0]),
        checkOutDate: convertDate(dates[1])
      }));
    }
  };

  const handleChange = (value, type) => {
    setPersonNumber((prevState) => ({
      ...prevState,
      [`${type}`]: value
    }));

    setDataBooking((prevState) => {
      if (type === 'adultsNumber') {
        return {
          ...prevState,
          [`${type}`]: value + 1
        }
      }
      return {
        ...prevState,
        [`${type}`]: value
      }
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target
    if (index === null) {
      console.log(value);
      setDataBooking(prevState => ({
        ...prevState,
        [name]: value
      }))
    } else {
      setDataBooking((prevState) => {
        const updatedPersonList = [...prevState.personList];
        updatedPersonList[index] = {
          ...updatedPersonList[index],
          [name]: value
        };

        return {
          ...prevState,
          personList: updatedPersonList
        };
      });
    }

  }

  const renderPersonForm = () => {
    const adultNum = personNumber.adultsNumber;
    const childrenNum = personNumber.childrenNumber;
    const inputAdultsElements = [];
    const inputChildrenElements = [];

    for (let i = 0; i < adultNum; i++) {
      inputAdultsElements.push(
        <Input
          name='name'
          key={i}
          style={{ width: '100%', marginBottom: '10px ' }}
          placeholder="Adult name"
          onChange={event => handleInputChange(event, i)}
        />
      );
    }
    for (let i = 0; i < childrenNum; i++) {
      inputChildrenElements.push(
        <Input
          name='name'
          key={adultNum + 1 + i}
          style={{ width: '100%', marginBottom: '10px ' }}
          placeholder="Child name"
          onChange={event => handleInputChange(event, (adultNum + i))} />
      );
    }

    return (
      <>
        <div
          className={styles.personForm}
          style={adultNum > 0 ? { display: 'block' } : { display: 'none' }}>
          {inputAdultsElements}
        </div>
        <div
          className={styles.personForm}
          style={childrenNum > 0 ? { display: 'block' } : { display: 'none' }}>
          {inputChildrenElements}
        </div>
      </>
    );
  };

  const calculateDateRange = () => {
    if (bookingDate && bookingDate[0] && bookingDate[1]) {
      const start = bookingDate[0].startOf('day');
      const end = bookingDate[1].startOf('day');
      const diffInDays = end.diff(start, 'days');
      return diffInDays;
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

  useEffect(() => {
    setDataBooking(prevState => ({
      ...prevState,
      price: room?.price * calculateDateRange()
    }))
  }, [calculateDateRange()]);

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
          {console.log(bookingDate)}
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
                    <span className={styles.itemContext}>Coffee</span>
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
                <div className={styles.personInBooking}>
                  <div className={styles.customerInfo}>
                    <div className={styles.title}>Information of customer</div>
                    <Input
                      name='customerName'
                      style={{ width: '100%', marginBottom: '15px ' }}
                      placeholder="Full name"
                      onChange={event => handleInputChange(event, null)}
                    />
                    <Input name='customerEmail'
                      type='email'
                      style={{ width: '100%', marginBottom: '15px ' }}
                      placeholder="Email"
                      onChange={event => handleInputChange(event, null)}
                    />
                    <Input
                      name='customerPhoneNumber'
                      style={{ width: '100%', marginBottom: '10px ' }}
                      placeholder="Phone"
                      onChange={event => handleInputChange(event, null)}
                    />
                  </div>
                  <Divider />
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
                              onChange={(value) => handleChange(value, 'adultsNumber')}
                              options={generateOptionPerson(room?.adultsMax - 1)}
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
                              onChange={(value) => handleChange(value, 'childrenNumber')}
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
                  value={selectedRange}
                  disabledDate={(current) => current && current < moment().startOf('day')}
                />
                <Row
                  className={styles.totalPrice}
                  justify="space-between"
                  align="middle"
                  style={{ display: 'flex' }}>
                  <Col span={12}>
                    ${commaMoneyAmount(room?.price)} x {calculateDateRange()} night(s)
                  </Col>
                  <Col className={styles.total} span={4}>
                    ${calculateDateRange() * room?.price}
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
