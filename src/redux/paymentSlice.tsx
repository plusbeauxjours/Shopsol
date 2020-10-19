import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    TOTAL_PAYMENT_WORKING_EMP: [],
  },
  reducers: {
    setTOTAL_PAYMENT_WORKING_EMP(state, action) {
      const {payload: TOTAL_PAYMENT_WORKING_EMP} = action;
      return {
        ...state,
        TOTAL_PAYMENT_WORKING_EMP,
      };
    },
  },
});

export const {setTOTAL_PAYMENT_WORKING_EMP} = paymentSlice.actions;

export const getTOTAL_PAYMENT_WORKING_EMP = (
  YEAR = moment().format('YYYY'),
  MONTH = moment().format('MM'),
) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();

  try {
    const {data} = await api.getWorkingEmpTotalPay(YEAR, MONTH, STORE_SEQ);
    if (data.message === 'SUCCESS') {
      dispatch(setTOTAL_PAYMENT_WORKING_EMP(data.result));
    }
  } catch (e) {
    console.log(e);
  }
};

export default paymentSlice.reducer;
