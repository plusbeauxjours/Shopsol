import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    LOADING: false,
    CALENDAR_DATA_STORE_SEQ: '',
    CALENDAR_DATA: {},
  },
  reducers: {
    setCALENDAR_DATA_STORE_SEQ(state, action) {
      const {payload: CALENDAR_DATA_STORE_SEQ} = action;
      state.CALENDAR_DATA_STORE_SEQ = CALENDAR_DATA_STORE_SEQ;
    },
    resetCALENDAR_DATA(state) {
      state.CALENDAR_DATA_STORE_SEQ = '';
      state.CALENDAR_DATA = {};
    },
    setCALENDAR_DATA(state, action) {
      console.log('setCALENDAR_DATA');
      const {
        payload: {CALENDAR_DATA, date},
      } = action;
      if (state.CALENDAR_DATA) {
        if (
          state.CALENDAR_DATA.hasOwnProperty(moment(date).format('YYYY-MM-DD'))
        ) {
          state.CALENDAR_DATA = CALENDAR_DATA;
        } else {
          state.CALENDAR_DATA = {...CALENDAR_DATA};
        }
      } else {
        state.CALENDAR_DATA = CALENDAR_DATA;
      }
    },
    toggleVACATION(state, action) {
      const {
        payload: {VACATION, DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].find(
        (i) => i.MEMBER_SEQ === MEMBER_SEQ,
      );
      if (item) {
        item.VACATION = VACATION;
      }
    },
    updateREST_TIME(state, action) {
      const {
        payload: {REST_TIME, DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].find(
        (i) => i.MEMBER_SEQ === MEMBER_SEQ,
      );
      if (item) {
        item.REST_TIME = REST_TIME;
      }
    },
    removeAddWork(state, action) {
      const {
        payload: {DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].filter(
        (i) => i.MEMBER_SEQ !== MEMBER_SEQ,
      );
      state.CALENDAR_DATA[DATE] = item;
    },
    updateWORKTIME(state, action) {
      const {
        payload: {date, EMP_ID, START, END, CHANGE_START, CHANGE_END},
      } = action;
      const item = state.CALENDAR_DATA[date].find((i) => i.EMP_ID === EMP_ID);
      item.START = START;
      item.END = END;
      item.CHANGE_START = CHANGE_START;
      item.CHANGE_END = CHANGE_END;
    },
    updateSCHEDULE(state, action) {
      const {
        payload: {
          date,
          EMP_ID,
          UPDATED_START,
          UPDATED_END,
          START_TIME,
          END_TIME,
        },
      } = action;
      const item = state.CALENDAR_DATA[date].find((i) => i.EMP_ID === EMP_ID);
      item.UPDATED_START = UPDATED_START;
      item.UPDATED_END = UPDATED_END;
      item.START_TIME = START_TIME;
      item.END_TIME = END_TIME;
    },
  },
});

export const {
  setCALENDAR_DATA_STORE_SEQ,
  resetCALENDAR_DATA,
  setCALENDAR_DATA,
  toggleVACATION,
  updateREST_TIME,
  removeAddWork,
  updateSCHEDULE,
  updateWORKTIME,
} = calendarSlice.actions;

export default calendarSlice.reducer;
