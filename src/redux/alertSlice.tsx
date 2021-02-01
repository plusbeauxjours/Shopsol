import {createSlice} from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
    alertType: null,
    title: '',
    content: '',
    okButtonText: '확인',
    okCallback: () => {},
    cancelButtonText: '취소',
    cancelCallback: () => {},
    warning: 'no',
    close: null,
    image: null,
    isHeight: false,
  },
  reducers: {
    setAlertVisible(state, action) {
      const {payload: visible} = action;
      state.visible = visible;
    },
    setAlertInfo(state, action) {
      const {
        payload: {
          alertType,
          title,
          content,
          okButtonText,
          okCallback,
          cancelButtonText,
          cancelCallback,
          warning,
          close,
          image,
          isHeight,
        },
      } = action;
      state.alertType = alertType;
      state.title = title;
      state.content = content;
      state.okButtonText = okButtonText ?? '확인';
      state.okCallback = okCallback;
      state.cancelButtonText = cancelButtonText ?? '취소';
      state.cancelCallback = cancelCallback;
      state.warning = warning;
      state.close = close;
      state.image = image;
      state.isHeight = isHeight;
    },
  },
});

export const {setAlertVisible, setAlertInfo} = alertSlice.actions;

export default alertSlice.reducer;
