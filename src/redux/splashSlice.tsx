import {createSlice} from '@reduxjs/toolkit';

const splashSlice = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
    text: '',
    fullText: null,
    loading: false,
  },
  reducers: {
    setSplashVisible(state, action) {
      const {
        payload: {visible, text = '', fullText = null},
      } = action;
      return {
        ...state,
        visible,
        text,
        fullText,
      };
    },
    setLoadingVisible(state, action) {
      const {payload: loading} = action;
      return {
        ...state,
        loading,
      };
    },
  },
});

export const {setSplashVisible, setLoadingVisible} = splashSlice.actions;

export default splashSlice.reducer;
