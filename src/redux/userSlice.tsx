import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    IS_SUPER_USER: false,
    MEMBER_SEQ: '',
    MEMBER_NAME: '',
    GENDER: '',
    STORE: '',
    TYPE: '',
    AVATAR: '',
    MOBILE_NO: '',
    VERSION: '',
    PUSH_TOKEN: '',
    DEVICE_MODEL: '',
    DEVICE_PLATFORM: '',
    DEVICE_SYSTEM_VERSION: '',
    CUSTOM_MENU_EMP: {},
    IS_APP_FIRST_TIME: true,
    IS_USER_FIRST_TIME: true,
  },
  reducers: {
    setIS_APP_FIRST_TIME(state, action) {
      const {payload: IS_APP_FIRST_TIME} = action;
      state.IS_APP_FIRST_TIME = IS_APP_FIRST_TIME;
    },
    setIS_USER_FIRST_TIME(state, action) {
      const {payload: IS_USER_FIRST_TIME} = action;
      state.IS_USER_FIRST_TIME = IS_USER_FIRST_TIME;
    },
    setIS_SUPER_USER(state) {
      state.IS_SUPER_USER = true;
    },
    setMEMBER_NAME(state, action) {
      const {payload: MEMBER_NAME} = action;
      state.MEMBER_NAME = MEMBER_NAME;
    },
    setSTORE(state, action) {
      const {payload: STORE} = action;
      state.STORE = STORE;
    },
    setUSER(state, action) {
      const {
        payload: {userInfo, mobileNo},
      } = action;
      state.MEMBER_SEQ = userInfo.MEMBER_SEQ;
      state.GENDER = userInfo.GENDER;
      state.MEMBER_NAME = userInfo.NAME;
      state.STORE = userInfo.STORE;
      state.TYPE = userInfo.TYPE;
      state.AVATAR = userInfo?.images[0]?.IMAGE;
      state.MOBILE_NO = mobileNo;
      state.isLoggedIn = true;
    },
    setLOGOUT(state) {
      state.isLoggedIn = false;
      state.IS_SUPER_USER = false;
      state.MEMBER_SEQ = '';
      state.GENDER = '';
      state.STORE = '';
      state.MOBILE_NO = '';
      state.CUSTOM_MENU_EMP = {};
    },
    setDEVICE_PLATFORM(state, action) {
      const {payload: DEVICE_PLATFORM} = action;
      state.DEVICE_PLATFORM = DEVICE_PLATFORM;
    },
    setDEVICE_INFO(state, action) {
      const {
        payload: {
          PUSH_TOKEN,
          DEVICE_MODEL,
          DEVICE_PLATFORM,
          DEVICE_SYSTEM_VERSION,
        },
      } = action;
      state.PUSH_TOKEN = PUSH_TOKEN;
      state.DEVICE_MODEL = DEVICE_MODEL;
      state.DEVICE_PLATFORM = DEVICE_PLATFORM;
      state.DEVICE_SYSTEM_VERSION = DEVICE_SYSTEM_VERSION;
    },
  },
});

export const {
  setIS_APP_FIRST_TIME,
  setIS_USER_FIRST_TIME,
  setIS_SUPER_USER,
  setMEMBER_NAME,
  setSTORE,
  setUSER,
  setLOGOUT,
  setDEVICE_PLATFORM,
  setDEVICE_INFO,
} = userSlice.actions;

export default userSlice.reducer;
