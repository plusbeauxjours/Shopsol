import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    TASK_DATA: [],
  },
  reducers: {
    setTASK_DATA(state, action) {
      const {payload: TASK_DATA} = action;
      state.TASK_DATA = TASK_DATA;
    },
    checkTASK(state, action) {
      const {
        payload: {name, task_SEQ, checkEmpName, checkTime},
      } = action;
      const item = state.TASK_DATA.find((i) => i.name === name).items.find(
        (i) => i.task_SEQ === task_SEQ,
      );
      if (item) {
        item.checkType = '1';
        item.checkTime = checkTime;
        item.checkEmpName = checkEmpName;
      }
    },
    cancelTASK(state, action) {
      const {
        payload: {name, task_SEQ},
      } = action;
      const item = state.TASK_DATA.find((i) => i.name === name).items.find(
        (i) => i.task_SEQ === task_SEQ,
      );
      if (item) {
        item.checkType = '0';
      }
    },
    updateTASK_DATA(state, action) {
      const {
        payload: {name, task_SEQ, taskName, taskDate, taskMemo, IMG_LIST},
      } = action;
      const item = state.TASK_DATA.find((i) => i.name === name).items.find(
        (i) => i.task_SEQ === task_SEQ,
      );
      if (item) {
        item.taskName = taskName;
        item.taskDate = taskDate;
        item.taskMemo = taskMemo;
        item.IMG_LIST = IMG_LIST;
      }
    },
    removeTASK_DATA(state, action) {
      const {
        payload: {name, task_SEQ},
      } = action;
      const items = state.TASK_DATA.find((i) => i.name === name).items.filter(
        (i) => i.task_SEQ !== task_SEQ,
      );
      state.TASK_DATA = state.TASK_DATA.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            items: [...items],
          };
        }
        return item;
      });
    },
  },
});

export const {
  setTASK_DATA,
  checkTASK,
  cancelTASK,
  updateTASK_DATA,
  removeTASK_DATA,
} = taskSlice.actions;

export const getTASK_DATA = (
  YEAR: string = moment().format('YYYY'),
  MONTH: string = moment().format('MM'),
  DAY: string = moment().format('DD'),
) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  try {
    const {data} = await api.getTaskData({
      STORE_SEQ,
      YEAR,
      MONTH,
      DAY,
    });
    return data.resultdata;
  } catch (e) {
    console.log(e);
  }
};

export default taskSlice.reducer;
