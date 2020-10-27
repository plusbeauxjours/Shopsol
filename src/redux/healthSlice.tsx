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
    updateHEALTH_EMP_LIST(state, action) {
      const {
        payload: {
          EMP_SEQ,
          RESULT_DATE,
          NAME,
          PUSH_DAY,
          RESULT_COUNT,
          SELECT_INDEX,
        },
      } = action;
      if (SELECT_INDEX === 0) {
        const item = state.HEALTH_EMP_LIST.find((i) => i.EMP_SEQ == EMP_SEQ);
        if (item) {
          item.NAME = NAME;
          item.RESULT_DATE = RESULT_DATE;
          item.PUSH_DAY = PUSH_DAY;
          item.RESULT_COUNT = RESULT_COUNT;
        }
      }
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
  updateHEALTH_EMP_LIST,
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
      dispatch(setSplashVisible(true));
    }
    const {data} = await api.getCertificate({STORE_SEQ, MEMBER_SEQ, STORE});
    dispatch(setHEALTH_CERTIFICATE_DATA(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export default healthSlice.reducer;
