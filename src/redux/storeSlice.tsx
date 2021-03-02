import {createSlice} from '@reduxjs/toolkit';
import {setEMPLOYEE_LIST} from '~/redux/employeeSlice';
import api from '~/constants/LoggedInApi';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    STORE_SEQ: '',
    STORE_NAME: '',
    EMP_SEQ: '',
    STORE_DATA: {},
    MANAGER_CALLED: '',
  },
  reducers: {
    updateQR_Num(state, action) {
      const {payload: QR_Num} = action;
      if (state.STORE_DATA.resultdata?.QR_Num) {
        state.STORE_DATA.resultdata.QR_Num = QR_Num;
      } else {
        state.STORE_DATA.resultdata.QR_Num = QR_Num;
      }
    },

    setSTORE_DATA(state, action) {
      const {payload: STORE_DATA} = action;
      state.MANAGER_CALLED =
        STORE_DATA?.resultdata?.CATEGORY == '일반회사' ? '관리자' : '매니저';
      state.STORE_DATA = STORE_DATA;
      state.EMP_SEQ = STORE_DATA.EMP_SEQ;
    },
    selectSTORE(state, action) {
      const {
        payload: {STORE_SEQ, STORE_NAME},
      } = action;
      state.STORE_SEQ = STORE_SEQ;
      state.STORE_NAME = STORE_NAME;
    },
    updateSTORE(state, action) {
      const {
        payload: {
          NAME,
          ADDR1,
          ADDR2,
          TYPE,
          LATE_FLAG,
          LATE_TIME,
          EARLY_FLAG,
          EARLY_TIME,
          CALCULATE_DAY,
          GPS,
          JULI,
          CATEGORY,
          other,
          LAT,
          LONG,
        },
      } = action;
      state.STORE_DATA.resultdata.NAME = NAME;
      state.STORE_DATA.resultdata.ADDR1 = ADDR1;
      state.STORE_DATA.resultdata.ADDR2 = ADDR2;
      state.STORE_DATA.resultdata.TYPE = TYPE;
      state.STORE_DATA.resultdata.LATE_FLAG = LATE_FLAG;
      state.STORE_DATA.resultdata.LATE_TIME = LATE_TIME;
      state.STORE_DATA.resultdata.EARLY_FLAG = EARLY_FLAG;
      state.STORE_DATA.resultdata.EARLY_TIME = EARLY_TIME;
      state.STORE_DATA.resultdata.CALCULATE_DAY = CALCULATE_DAY;
      state.STORE_DATA.resultdata.GPS = GPS;
      state.STORE_DATA.resultdata.JULI = JULI;
      state.STORE_DATA.resultdata.CATEGORY = CATEGORY;
      state.STORE_DATA.resultdata.other = other;
      state.STORE_DATA.resultdata.LAT = LAT;
      state.STORE_DATA.resultdata.LONG = LONG;
      state.MANAGER_CALLED = CATEGORY == '일반회사' ? '관리자' : '매니저';
    },
    closeSTORE_DATA(state) {
      state.STORE_SEQ = '';
      state.STORE_NAME = '';
      state.EMP_SEQ = '';
      state.STORE_DATA = {};
      state.MANAGER_CALLED = '';
    },
    removeSTORE_NAME(state) {
      state.STORE_NAME = '';
    },
  },
});

export const {
  updateQR_Num,
  setSTORE_DATA,
  selectSTORE,
  updateSTORE,
  closeSTORE_DATA,
  removeSTORE_NAME,
} = storeSlice.actions;

export const getStore = (data) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    employeeReducer: {EMPLOYEE_LIST_SEQ},
  } = getState();
  dispatch(setSTORE_DATA(data));
  if (EMPLOYEE_LIST_SEQ != STORE_SEQ) {
    try {
      const {data: empData} = await api.getEmpLists(STORE_SEQ);
      if (empData.message == 'SUCCESS') {
        dispatch(setEMPLOYEE_LIST({EMPLOYEE_LIST: empData, STORE_SEQ}));
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export default storeSlice.reducer;
