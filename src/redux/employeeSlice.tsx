import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import {setSplashVisible} from './splashSlice';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    EMPLOYEE_LIST: [],
    EMPLOYEE_INFO_DATA: {},
    RESPONSE_EMPLOYEE: [],
    NO_RESPONSE_EMPLOYEE: [],
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
      const {payload: EMPLOYEE_LIST} = action;
      return {
        ...state,
        EMPLOYEE_LIST,
      };
    },
    updateEMPLOYEE_LIST(state, action) {
      const {
        payload: {EMP_SEQ, START, END, PAY, PAY_TYPE},
      } = action;
      const emp = state.EMPLOYEE_LIST?.workinglist?.find(
        (i) => i.EMP_SEQ == EMP_SEQ,
      );
      if (emp) {
        emp.START = START;
        emp.END = END;
        emp.PAY = PAY;
        emp.PAY_TYPE = PAY_TYPE;
      }
    },
    setRESPONSE_EMPLOYEE(state, action) {
      const {payload: RESPONSE_EMPLOYEE} = action;
      return {...state, RESPONSE_EMPLOYEE};
    },
    setNO_RESPONSE_EMPLOYEE(state, action) {
      const {payload: NO_RESPONSE_EMPLOYEE} = action;
      return {...state, NO_RESPONSE_EMPLOYEE};
    },
    removeRESPONSE_EMPLOYEE(state, action) {
      const {payload: EMP_SEQ} = action;
      return {
        ...state,
        RESPONSE_EMPLOYEE: state.RESPONSE_EMPLOYEE.filter(
          (i) => i.EMP_SEQ !== EMP_SEQ,
        ),
      };
    },
  },
});

export const {
  setEMPLOYEE_INFO_DATA,
  setEMPLOYEE_LIST,
  updateEMPLOYEE_LIST,
  setRESPONSE_EMPLOYEE,
  setNO_RESPONSE_EMPLOYEE,
  removeRESPONSE_EMPLOYEE,
} = employeeSlice.actions;

export const getRESPONSE_EMPLOYEE = () => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    employeeReducer: {RESPONSE_EMPLOYEE, NO_RESPONSE_EMPLOYEE},
  } = getState();
  try {
    if (!RESPONSE_EMPLOYEE || !NO_RESPONSE_EMPLOYEE) {
      dispatch(setSplashVisible({visible: true}));
    }
    const {data} = await api.getWaitEmpList(STORE_SEQ);
    if (data.message === 'SUCCESS') {
      dispatch(setRESPONSE_EMPLOYEE(data.result));
      dispatch(setNO_RESPONSE_EMPLOYEE(data.result2));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export default employeeSlice.reducer;
