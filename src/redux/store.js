import { configureStore } from '@reduxjs/toolkit';

import bookingDate from './slices/bookingDateSlice';

const store = configureStore({
  reducer: {
    bookingDate: bookingDate
  }
});

export default store;
