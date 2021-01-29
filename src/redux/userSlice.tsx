import {createSlice} from '@reduxjs/toolkit';
import {removeSTORE_NAME} from './storeSlice';
import {closeSTORE_DATA} from '~/redux/storeSlice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
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
    addCUSTOM_MENU_EMP(state, action) {
      const {
        payload: {STORE_SEQ, CUSTOM_MENU_EMP},
      } = action;
      const item = state.CUSTOM_MENU_EMP[STORE_SEQ];
      if (item) {
        item.push(CUSTOM_MENU_EMP);
      } else {
        return {
          ...state,
          CUSTOM_MENU_EMP: {
            ...state.CUSTOM_MENU_EMP,
            [STORE_SEQ]: [CUSTOM_MENU_EMP],
          },
        };
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
      return {
        ...state,
        MEMBER_NAME,
      };
    },
    setSTORE(state, action) {
      const {payload: STORE} = action;
      return {
        ...state,
        STORE,
      };
    },
    setUSER(state, action) {
      const {
        payload: {userInfo, mobileNo},
      } = action;
      return {
        ...state,
        MEMBER_SEQ: userInfo.MEMBER_SEQ,
        GENDER: userInfo.GENDER,
        MEMBER_NAME: userInfo.NAME,
        STORE: userInfo.STORE,
        TYPE: userInfo.TYPE,
        AVATAR: userInfo.images[0].IMAGE,
        MOBILE_NO: mobileNo,
        isLoggedIn: true,
      };
    },
    setLOGOUT(state) {
      return {
        ...state,
        isLoggedIn: false,
        MEMBER_SEQ: '',
        GENDER: '',
        STORE: '',
        MOBILE_NO: '',
        CUSTOM_MENU_EMP: {},
      };
    },
    setDEVICE_PLATFORM(state, action) {
      const {payload: DEVICE_PLATFORM} = action;
      return {
        ...state,
        DEVICE_PLATFORM,
      };
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
      return {
        ...state,
        PUSH_TOKEN,
        DEVICE_MODEL,
        DEVICE_PLATFORM,
        DEVICE_SYSTEM_VERSION,
      };
    },
  },
});

export const {
  setMEMBER_NAME,
  setSTORE,
  setUSER,
  setLOGOUT,
  setDEVICE_PLATFORM,
  setDEVICE_INFO,
  addCUSTOM_MENU_EMP,
  removeCUSTOM_MENU_EMP,
} = userSlice.actions;

export const userLogout = () => async (dispatch) => {
  dispatch(removeSTORE_NAME());
  dispatch(setLOGOUT());
};

export const closeSTORE_ON_STORE_LIST = () => async (dispatch) => {
  try {
    dispatch(closeSTORE_DATA());
  } catch (e) {
    console.log(e);
  }
};

export default userSlice.reducer;
