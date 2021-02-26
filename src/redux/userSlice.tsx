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
  },
  reducers: {
    setIS_SUPER_USER(state) {
      state.IS_SUPER_USER = true;
    },
    addCUSTOM_MENU_EMP(state, action) {
      const {
        payload: {STORE_SEQ, CUSTOM_MENU_EMP},
      } = action;
      const item = state.CUSTOM_MENU_EMP[STORE_SEQ];
      if (item) {
        item.push(CUSTOM_MENU_EMP);
      } else {
        state.CUSTOM_MENU_EMP[STORE_SEQ] = [CUSTOM_MENU_EMP];
      }
    },
    removeCUSTOM_MENU_EMP(state, action) {
      const {
        payload: {STORE_SEQ, CUSTOM_MENU_EMP},
      } = action;
      const item = state.CUSTOM_MENU_EMP[STORE_SEQ];
      if (item) {
        state.CUSTOM_MENU_EMP[STORE_SEQ] = CUSTOM_MENU_EMP;
      }
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
  setIS_SUPER_USER,
  setMEMBER_NAME,
  setSTORE,
  setUSER,
  setLOGOUT,
  setDEVICE_PLATFORM,
  setDEVICE_INFO,
  addCUSTOM_MENU_EMP,
  removeCUSTOM_MENU_EMP,
} = userSlice.actions;

export default userSlice.reducer;
