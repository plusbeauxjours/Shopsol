import {createSlice} from '@reduxjs/toolkit';

const splashSlice = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
    text: '',
    fullText: null,
    loading: true,
  },
  reducers: {
    setSplashVisible(state, action) {
      const {
        payload: {visible, text = '', fullText = null},
      } = action;
      state.visible = visible;
      state.text = text;
      state.fullText = fullText;
    },
    setLoadingVisible(state, action) {
      const {payload: loading} = action;
      state.loading = loading;
    },
  },
});

export const {setSplashVisible, setLoadingVisible} = splashSlice.actions;

export default splashSlice.reducer;
