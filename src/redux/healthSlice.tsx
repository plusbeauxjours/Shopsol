import {createSlice} from '@reduxjs/toolkit';
import {setSplashVisible} from './splashSlice';
import api from '../constants/LoggedInApi';

const healthSlice = createSlice({
  name: 'health',
  initialState: {
    SELECT_INDEX: 0,
    HEALTH_CERTIFICATE_DATA: {},
    HEALTH_EMP_LIST: [],
    HEALTH_EMP_DETAIL: [],
    HEALTH_STORE_DETAIL: [],
  },
  reducers: {
    setHEALTH_CERTIFICATE_DATA(state, action) {
      const {payload: HEALTH_CERTIFICATE_DATA} = action;
      return {
        ...state,
        HEALTH_CERTIFICATE_DATA,
      };
    },
    setHEALTH_EMP_LIST(state, action) {
      const {payload: HEALTH_EMP_LIST} = action;
      return {
        ...state,
        HEALTH_EMP_LIST,
      };
    },
    setHEALTH_EMP_DETAIL(state, action) {
      const {payload: HEALTH_EMP_DETAIL} = action;
      return {
        ...state,
        HEALTH_EMP_DETAIL,
      };
    },
    setHEALTH_STORE_DETAIL(state, action) {
      const {payload: HEALTH_STORE_DETAIL} = action;
      return {
        ...state,
        HEALTH_STORE_DETAIL,
      };
    },
    setSELECT_INDEX(state, action) {
      const {payload: SELECT_INDEX} = action;
      return {
        ...state,
        SELECT_INDEX,
      };
    },
    removeHEALTH_EMP_DETAIL(state, action) {
      const {payload: STORE_HEALTH_SEQ} = action;
      return {
        ...state,
        HEALTH_EMP_DETAIL: state.HEALTH_EMP_DETAIL.filter(
          (i) => i.STORE_HEALTH_SEQ !== STORE_HEALTH_SEQ,
        ),
      };
    },
    removeHEALTH_STORE_DETAIL(state, action) {
      const {payload: CEO_HEALTH_SEQ} = action;
      return {
        ...state,
        HEALTH_STORE_DETAIL: state.HEALTH_STORE_DETAIL.filter(
          (i) => i.CEO_HEALTH_SEQ !== CEO_HEALTH_SEQ,
        ),
      };
    },
  },
});

export const {
  setHEALTH_CERTIFICATE_DATA,
  setHEALTH_EMP_LIST,
  setHEALTH_EMP_DETAIL,
  setHEALTH_STORE_DETAIL,
  setSELECT_INDEX,
  removeHEALTH_EMP_DETAIL,
  removeHEALTH_STORE_DETAIL,
} = healthSlice.actions;

export const getHEALTH_CERTIFICATE_DATA = () => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    userReducer: {STORE, MEMBER_SEQ},
  } = getState();
  const {
    healthReducer: {HEALTH_CERTIFICATE_DATA},
  } = getState();
  try {
    if (!HEALTH_CERTIFICATE_DATA) {
      dispatch(setSplashVisible({visible: true}));
    }
    const {data} = await api.getCertificate({STORE_SEQ, MEMBER_SEQ, STORE});
    dispatch(setHEALTH_CERTIFICATE_DATA(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export const getSTORE_HEALTH_EMP_LIST = () => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    userReducer: {STORE, MEMBER_SEQ},
  } = getState();
  const {
    healthReducer: {HEALTH_EMP_LIST},
  } = getState();
  try {
    if (!HEALTH_EMP_LIST) {
      dispatch(setSplashVisible({visible: true}));
    }
    const {data} = await api.storeHealthEmpList({STORE_SEQ, STORE, MEMBER_SEQ});
    if (data.message === 'SUCCESS') {
      dispatch(setHEALTH_EMP_LIST(data.result));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export default healthSlice.reducer;
