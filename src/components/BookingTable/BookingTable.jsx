import { Button, Input, Modal, Table, message } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './booking-table.module.scss';
import {
  BOOKING_STATUS_BUTTON,
  BOOKING_STATUS_MENU_ITEM,
  BOOKING_TABLE_COLUMNS,
  UNEXPECTED_ERROR
} from '../../constants';
import bookingApi from '../../apis/booking';

const { Search } = Input;

const BookingTable = ({ currentStatus }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      const res = bookingApi.update(selectedRow.id);
      if (res.status === 200) {
        getBookings();
      }
    } catch (error) {
      message.error(UNEXPECTED_ERROR);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  const handleSearch = (value) => {
    setFilteredData(
      bookings.filter((item) => item.customer.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const columns = [
    ...BOOKING_TABLE_COLUMNS,
    status.showBtn && {
      render: (value) => <Button onClick={() => onClickStatusBtn(value)}>{status.name}</Button>
    }
  ].filter(Boolean);

  const getBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await bookingApi.getByStatus(currentStatus);
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
  return (
    <div>
      <Search placeholder="Search by name" onSearch={handleSearch} className={styles.search} />
      <Table
        loading={loading}
        bordered
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
      {status.showBtn && (
        <Modal
          okText="Confirm"
          closable={false}
          open={openModal}
          onCancel={onCancelModal}
          onOk={onConfirmModal}>
          Do you want to {status.name.toLowerCase()} this {selectedRow?.roomName}
        </Modal>
      )}
    </div>
  );
};

export default BookingTable;
