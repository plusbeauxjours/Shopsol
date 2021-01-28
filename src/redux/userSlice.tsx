import {createSlice} from '@reduxjs/toolkit';
import api from '~/constants/LoggedInApi';
import {removeSTORE_NAME} from './storeSlice';
import {setSplashVisible} from '~/redux/splashSlice';
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
    STORELIST_DATA: [],
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
        STORELIST_DATA: [],
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
    removeSTORE_ON_STORE_LIST(state, action) {
      const {payload: STORE_SEQ} = action;
      return {
        ...state,
        STORELIST_DATA: state.STORELIST_DATA.filter(
          (i) => i.STORE_SEQ !== STORE_SEQ,
        ),
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
  setSTORELIST_DATA,
  setSTORE,
  setUSER,
  setLOGOUT,
  setDEVICE_PLATFORM,
  removeSTORE_ON_STORE_LIST,
  setDEVICE_INFO,
  addCUSTOM_MENU_EMP,
  removeCUSTOM_MENU_EMP,
} = userSlice.actions;

export const userLogout = () => async (dispatch) => {
  dispatch(removeSTORE_NAME());
  dispatch(setLOGOUT());
};

export const getSTORELIST_DATA = () => async (dispatch, getState) => {
  const {
    userReducer: {STORE, MEMBER_SEQ, STORELIST_DATA},
  } = getState();
  if (!STORELIST_DATA || STORELIST_DATA?.length === 0) {
    dispatch(setSplashVisible({visible: true, text: '로그인'}));
  }
  try {
    const {data} = await api.storeList(STORE, MEMBER_SEQ);
    if (data.message === 'SUCCESS') {
      dispatch(setSTORELIST_DATA(data.result));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export const closeSTORE_ON_STORE_LIST = (STORE_SEQ) => async (dispatch) => {
  try {
    dispatch(removeSTORE_ON_STORE_LIST(STORE_SEQ));
    dispatch(closeSTORE_DATA());
  } catch (e) {
    console.log(e);
  }
};

export default userSlice.reducer;
