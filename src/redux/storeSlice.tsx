import {createSlice} from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    STORE_SEQ: '',
    STORE_NAME: '',
    EMP_SEQ: '',
    STORE_DATA: {},
  },
  reducers: {
    setEMP_SEQ(state, action) {
      const {payload: EMP_SEQ} = action;
      return {
        ...state,
        EMP_SEQ,
      };
    },
    setSTORE_DATA(state, action) {
      const {payload: STORE_DATA} = action;
      return {
        ...state,
        STORE_DATA,
      };
    },
    selectSTORE(state, action) {
      const {
        payload: {STORE_SEQ, STORE_NAME},
      } = action;
      return {
        ...state,
        STORE_SEQ,
        STORE_NAME,
      };
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
    },
    closeSTORE_DATA(state) {
      return {
        ...state,
        STORE_SEQ: '',
        STORE_NAME: '',
        EMP_SEQ: '',
        STORE_DATA: {},
      };
    },
    removeSTORE_NAME(state) {
      return {
        ...state,
        STORE_NAME: '',
      };
    },
  },
});

export const {
  setEMP_SEQ,
  setSTORE_DATA,
  selectSTORE,
  updateSTORE,
  closeSTORE_DATA,
  removeSTORE_NAME,
} = storeSlice.actions;

export default storeSlice.reducer;
