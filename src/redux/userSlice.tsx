import {createSlice} from '@reduxjs/toolkit';
import api from '~/constants/LoggedInApi';
import {removeSTORE_NAME} from './storeSlice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    MEMBER_SEQ: '',
    MEMBER_NAME: '',
    STORE: '',
    TYPE: '',
    MOBILE_NO: '',
    VERSION: '',
    STORELIST_DATA: [],
    PUSH_TOKEN: '',
    DEVICE_MODEL: '',
    DEVICE_PLATFORM: '',
    DEVICE_SYSTEM_VERSION: '',
  },
  reducers: {
    setMEMBER_NAME(state, action) {
      const {payload: MEMBER_NAME} = action;
      return {
        ...state,
        MEMBER_NAME,
      };
    },
    setMOBILE_NO(state, action) {
      const {payload: MOBILE_NO} = action;
      return {
        ...state,
        MOBILE_NO,
      };
    },
    setSTORELIST_DATA(state, action) {
      const {payload: STORELIST_DATA} = action;
      return {
        ...state,
        STORELIST_DATA,
      };
    },
    setUSER(state, action) {
      const {payload: userInfo} = action;
      return {
        ...state,
        MEMBER_SEQ: userInfo.MEMBER_SEQ,
        MEMBER_NAME: userInfo.NAME,
        STORE: userInfo.STORE,
        TYPE: userInfo.TYPE,
        MOBILE_NO: userInfo.mobileNo,
      };
    },
    setLOGIN(state) {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
    setLOGOUT(state) {
      return {
        ...state,
        isLoggedIn: false,
        MEMBER_SEQ: '',
        STORE: '',
        MOBILE_NO: '',
        STORELIST_DATA: [],
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
  setMOBILE_NO,
  setSTORELIST_DATA,
  setUSER,
  setLOGIN,
  setLOGOUT,
  setDEVICE_PLATFORM,
  setDEVICE_INFO,
} = userSlice.actions;

export const userLogin = () => async (dispatch) => {
  try {
    dispatch(setLOGIN());
  } catch (e) {
    console.log(e);
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(removeSTORE_NAME());
  dispatch(setLOGOUT());
};

export const getSTORELIST_DATA = () => async (dispatch, getState) => {
  const {
    userReducer: {STORE},
  } = getState();
  try {
    const {data} = await api.storeList(STORE);
    if (data.message === 'SUCCESS') {
      dispatch(setSTORELIST_DATA(data.result));
    }
  } catch (e) {
    console.log(e);
  }
};

export default userSlice.reducer;
