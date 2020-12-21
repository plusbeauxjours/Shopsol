import {createSlice} from '@reduxjs/toolkit';
import api from '~/constants/LoggedInApi';
import {removeSTORE_NAME} from './storeSlice';
import {setSplashVisible} from '~/redux/splashSlice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    MEMBER_SEQ: '',
    MEMBER_NAME: '',
    GENDER: '',
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
    setSTORE(state, action) {
      const {payload: STORE} = action;
      return {
        ...state,
        STORE,
      };
    },
    setUSER(state, action) {
      const {payload: userInfo} = action;
      return {
        ...state,
        MEMBER_SEQ: userInfo.MEMBER_SEQ,
        GENDER: userInfo.GENDER,
        MEMBER_NAME: userInfo.NAME,
        STORE: userInfo.STORE,
        TYPE: userInfo.TYPE,
        MOBILE_NO: userInfo.MobileNo,
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
        GENDER: '',
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
  setSTORE,
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
    userReducer: {STORE, MEMBER_SEQ},
  } = getState();
  const {
    userReducer: {STORELIST_DATA},
  } = getState();
  if (!STORELIST_DATA || STORELIST_DATA?.length === 0) {
    dispatch(setSplashVisible(true));
  }
  try {
    const {data} = await api.storeList(STORE, MEMBER_SEQ);
    if (data.message === 'SUCCESS') {
      dispatch(setSTORELIST_DATA(data.result));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export default userSlice.reducer;
