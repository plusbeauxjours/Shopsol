import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import {setSplashVisible} from './splashSlice';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    EMPLOYEE_LIST_SEQ: '',
    EMPLOYEE_LIST: [],
    EMPLOYEE_INFO_DATA: {},
    RESPONSE_EMPLOYEE: {},
    // NO_RESPONSE_EMPLOYEE: [],
  },
  reducers: {
    setEMPLOYEE_INFO_DATA(state, action) {
      const {payload: EMPLOYEE_INFO_DATA} = action;
      return {
        ...state,
        EMPLOYEE_INFO_DATA,
      };
    },
    setEMPLOYEE_LIST(state, action) {
      const {
        payload: {EMPLOYEE_LIST, STORE_SEQ},
      } = action;
      return {
        ...state,
        EMPLOYEE_LIST_SEQ: STORE_SEQ,
        EMPLOYEE_LIST,
      };
    },
    updateEMPLOYEE_LIST(state, action) {
      const {
        payload: {
          EMP_SEQ,
          START,
          END,
          PAY,
          PAY_TYPE,
          probationDATE,
          probationPercent,
        },
      } = action;
      const emp = state.EMPLOYEE_LIST?.workinglist?.find(
        (i) => i.EMP_SEQ == EMP_SEQ,
      );
      if (emp) {
        emp.START = START;
        emp.END = END;
        emp.PAY = PAY;
        emp.PAY_TYPE = PAY_TYPE;
        emp.probationDATE = probationDATE;
        emp.probationPercent = probationPercent;
      }
    },
    setRESPONSE_EMPLOYEE(state, action) {
      const {payload: RESPONSE_EMPLOYEE} = action;
      return {...state, RESPONSE_EMPLOYEE};
    },
    removeRESPONSE_EMPLOYEE(state, action) {
      const {payload: EMP_SEQ} = action;
      return {
        ...state,
        RESPONSE_EMPLOYEE: {
          ...state.RESPONSE_EMPLOYEE,
          result: state.RESPONSE_EMPLOYEE?.result.filter(
            (i) => i.EMP_SEQ !== EMP_SEQ,
          ),
        },
      };
    },
  },
});

export const {
  setEMPLOYEE_INFO_DATA,
  setEMPLOYEE_LIST,
  updateEMPLOYEE_LIST,
  setRESPONSE_EMPLOYEE,
  removeRESPONSE_EMPLOYEE,
} = employeeSlice.actions;

export const getRESPONSE_EMPLOYEE = () => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    employeeReducer: {RESPONSE_EMPLOYEE},
  } = getState();
  try {
    if (!RESPONSE_EMPLOYEE) {
      dispatch(setSplashVisible({visible: true, text: '직원'}));
    }
    const {data} = await api.getWaitEmpList(STORE_SEQ);
    if (data.message === 'SUCCESS') {
      dispatch(setRESPONSE_EMPLOYEE(data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export default employeeSlice.reducer;
