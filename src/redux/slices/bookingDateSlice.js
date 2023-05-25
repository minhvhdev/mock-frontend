import { createSlice } from '@reduxjs/toolkit';

const initialState = [null, null];

const bookingDateSlice = createSlice({
  name: 'bookingDate',
  initialState,
  reducers: {
    changeBookingDate: (state, { payload }) => {
      state[0] = payload[0];
      state[1] = payload[1];
    }
  }
});

const { reducer, actions } = bookingDateSlice;
export const { changeBookingDate } = actions;
export default reducer;
