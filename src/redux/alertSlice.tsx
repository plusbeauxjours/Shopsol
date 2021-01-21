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
      return {
        ...state,
        visible,
      };
    },
    setAlertInfo(state, action) {
      const {
        payload: {
          alertType,
          height,
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
      return {
        ...state,
        alertType,
        height,
        title,
        content,
        okButtonText: okButtonText ?? '확인',
        okCallback,
        cancelButtonText: cancelButtonText ?? '취소',
        cancelCallback,
        warning,
        close,
        image,
        isHeight,
      };
    },
  },
});

export const {setAlertVisible, setAlertInfo} = alertSlice.actions;

export default alertSlice.reducer;
