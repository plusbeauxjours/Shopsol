import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import api from '../constants/LoggedInApi';
import {setSplashVisible} from './splashSlice';

const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    CHECKLIST_DATA: [],
    CHECKLIST_MARKED: {},
  },
  reducers: {
    setCHECKLIST_DATA(state, action) {
      const {payload: CHECKLIST_DATA} = action;
      return {
        ...state,
        CHECKLIST_DATA,
      };
    },
    setCHECKLIST_MARKED(state, action) {
      const {payload: CHECKLIST_MARKED} = action;
      return {
        ...state,
        CHECKLIST_MARKED,
      };
    },
  },
});

export const {setCHECKLIST_DATA, setCHECKLIST_MARKED} = checklistSlice.actions;

export const getCHECKLIST_DATA = (
  date = moment().format('YYYY-MM-DD'),
) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  try {
    dispatch(setSplashVisible(true));
    const {data} = await api.getChecklist(STORE_SEQ, date);
    if (data.message === 'SUCCESS') {
      dispatch(setCHECKLIST_DATA(data.result));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export default checklistSlice.reducer;
