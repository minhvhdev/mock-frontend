import { Button, Input, Modal, Table, message, Row, Col, DatePicker, Select, Divider } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CSVLink } from "react-csv";
import styles from './booking-table.module.scss';
import {
  BOOKING_STATUS_BUTTON,
  BOOKING_STATUS_MENU_ITEM,
  BOOKING_TABLE_COLUMNS,
  UNEXPECTED_ERROR
} from '../../constants';
import bookingApi from '../../apis/booking';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';

const convertDate = (date) => {
  const dateInput = new Date(date);
  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, '0');
  const day = String(dateInput.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const BookingTable = ({ currentStatus }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    selectedDate: [],
    status: ''
  })
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { RangePicker } = DatePicker;

  const status = useMemo(() => {
    const name = BOOKING_STATUS_BUTTON[currentStatus];
    const showBtn = currentStatus !== BOOKING_STATUS_MENU_ITEM[2].key;
    return { name, showBtn };
  }, [currentStatus]);

  const onClickStatusBtn = (value) => {
    setOpenModal(true);
    setSelectedRow(value);
  };

  const onCancelModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const onConfirmModal = () => {
    try {
      setLoading(true);
      const res = bookingApi.update(selectedRow.id, 'booked');
      if (res.status === 200) {
        message.success("Update status booking successful!")
        getBookings();
      }
    } catch (error) {
      message.error(UNEXPECTED_ERROR);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };
  const filterFunction = () => {
    let booking = [...bookings]
    if (filter.name)
      booking = bookings.filter((item) => item.customer.toLowerCase().includes(filter.name.toLowerCase()))

    if (filter.selectedDate && filter.selectedDate.length === 2) {
      const startDate = convertDate(filter.selectedDate[0]);
      const endDate = convertDate(filter.selectedDate[1]);
      booking = booking.filter(item => (new Date(startDate) <= new Date(item.checkInDate) && new Date(endDate) >= new Date(item.checkOutDate)))
    }
    if (filter.status)
      booking = booking.filter((item) => item.status === filter.status)

    setFilteredData(
      booking
    );
  }
  useEffect(() => {
    filterFunction();
  }, [filter])
  const handleRangeChange = (dates) => {
    if (dates && dates.length === 2)
      dates = dates.map((item) => convertDate(item))

    setFilter({ ...filter, selectedDate: dates })

  }

  const handleSearch = (value) => {
    setFilter({ ...filter, name: value.target.value })
  };

  const handleChange = (value) => {
    setFilter({ ...filter, status: value })
  }

  const columns = [
    ...BOOKING_TABLE_COLUMNS,
    status.showBtn && {
      render: (value) => <Button onClick={() => onClickStatusBtn(value)}>{status.name}</Button>
    }
  ].filter(Boolean);

  const getBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await bookingApi.getAll();
      if (res.status === 200) {
        setBookings(res.data);
        setFilteredData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentStatus]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Room Name', key: 'roomName' },
    { label: 'Customer', key: 'customer' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Check-In Date', key: 'checkInDate' },
    { label: 'Check-Out Date', key: 'checkOutDate' },
    { label: 'Status', key: 'status' },
    { label: 'Price', key: 'price' },
  ];

  const csvFileName = 'hotel_bookings.csv';
  return (
    <div>
      <Row justify="space-around" className={styles.headers}>
        <Col>
          <Input
            placeholder="Search by name"
            onChange={handleSearch}
            name='name' value={filter.name}
            className={styles.search} />
        </Col>
        <Col>
          <RangePicker
            className={styles.rangePicker}
            name="rangeDate"
            size="large"
            onChange={handleRangeChange}
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
        </Col>
        <Col>
          <Select
            className={styles.selectStatus}
            defaultValue=""
            size='large'
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: '', label: 'Status' },
              { value: 'booked', label: 'Booked' },
              { value: 'checked in', label: 'Checked in' },
              { value: 'checked out', label: 'Checked out' },
            ]}
          />
        </Col>
        <Col>
          <CSVLink data={filteredData} headers={headers} filename={csvFileName}>
            <Button className={styles.exportBtn} type="primary" icon={<DownloadOutlined />} size={14}>
              Export to CSV
            </Button>
          </CSVLink>
        </Col>
      </Row>
      <Divider />
      <Table
        loading={loading}
        bordered
        columns={columns}
        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
        pagination={{ pageSize: 10 }}
      />
      {status.showBtn && (
        <Modal
          okText="Confirm"
          closable={false}
          open={openModal}
          onCancel={onCancelModal}
          onOk={onConfirmModal}>
          Do you want to {status.name.toLowerCase()} this {selectedRow?.room?.name}
        </Modal>
      )}
    </div>
  );
};

export default BookingTable;
