import {createSlice} from '@reduxjs/toolkit';

const splashSlice = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
    text: '',
  },
  reducers: {
    setSplashVisible(state, action) {
      const {
        payload: {visible, text = ''},
      } = action;
      return {
        ...state,
        visible,
        text,
      };
    },
  },
});

export const {setSplashVisible} = splashSlice.actions;

export default splashSlice.reducer;
