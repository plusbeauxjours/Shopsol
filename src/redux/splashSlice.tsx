import {createSlice} from '@reduxjs/toolkit';

const splashSlice = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
  },
  reducers: {
    setSplashVisible(state, action) {
      const {payload: visible} = action;
      return {
        ...state,
        visible,
      };
    },
  },
});

export const {setSplashVisible} = splashSlice.actions;

export default splashSlice.reducer;
