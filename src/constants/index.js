export const BASE_API_URL = 'http://localhost:8080/api/v1';

export const WEBSITE_NAME = 'Hotel Califonia';

export const UNEXPECTED_ERROR = 'There was an expected error with system!';

export const BOOKING_STATUS_MENU_ITEM = [
  { label: 'Booked', key: 'booked' },
  {
    label: 'Checked in',
    key: 'checked in'
  },
  {
    label: 'Checked out',
    key: 'checked out'
  }
];

export const BOOKING_STATUS_BUTTON = {
  booked: 'Check in',
  'checked in': 'Check out'
};

export const BOOKING_TABLE_COLUMNS = [
  {
    title: 'Room Name',
    dataIndex: 'roomName',
    key: 'roomName'
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: 'Check-in Date',
    dataIndex: 'checkInDate',
    key: 'checkInDate'
  },
  {
    title: 'Check-out Date',
    dataIndex: 'checkOutDate',
    key: 'checkOutDate'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  }
];

export const ROOM_TABLE_COLUMNS = [
  {
    title: 'Room Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Adults max',
    dataIndex: 'adultsMax',
    key: 'adultsMax'
  },
  {
    title: 'Children max',
    dataIndex: 'childrenMax',
    key: 'childrenMax'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  }
];
