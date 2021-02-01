import {createSlice} from '@reduxjs/toolkit';

const mypageSlice = createSlice({
  name: 'mypage',
  initialState: {
    CLOSED_STORE_DATA: [],
  },
  reducers: {
    setCLOSED_STORE_DATA(state, action) {
      const {payload: CLOSED_STORE_DATA} = action;
      state.CLOSED_STORE_DATA = CLOSED_STORE_DATA;
    },
  },
});

export const {setCLOSED_STORE_DATA} = mypageSlice.actions;

export default mypageSlice.reducer;
