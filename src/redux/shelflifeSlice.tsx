import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';

const shelflifetSlice = createSlice({
  name: 'shelflife',
  initialState: {
    SHELFLIFE_DATA: [],
  },
  reducers: {
    setSHELFLIFE_DATA(state, action) {
      const {payload: SHELFLIFE_DATA} = action;
      state.SHELFLIFE_DATA = SHELFLIFE_DATA;
    },
    checkSHELFLIFE(state, action) {
      const {
        payload: {name, shelfLife_SEQ, checkEmpName, checkTime},
      } = action;
      const item = state.SHELFLIFE_DATA?.find(
        (i) => i.name === name,
      ).items?.find((i) => i.shelfLife_SEQ === shelfLife_SEQ);
      if (item) {
        item.checkType = '1';
        item.checkTime = checkTime;
        item.checkEmpName = checkEmpName;
      }
    },
    cancelSHELFLIFE(state, action) {
      const {
        payload: {name, shelfLife_SEQ},
      } = action;
      const item = state.SHELFLIFE_DATA?.find(
        (i) => i.name === name,
      ).items?.find((i) => i.shelfLife_SEQ === shelfLife_SEQ);
      if (item) {
        item.checkType = '0';
      }
    },
    updateSHELFLIFE_DATA(state, action) {
      const {
        payload: {
          name,
          shelfLife_SEQ,
          shelfLifeName,
          shelfLifeDate,
          shelfLifeMemo,
          IMG_LIST,
          shelfLifeBarcode,
          shelfLifeImgLink,
        },
      } = action;
      const item = state.SHELFLIFE_DATA?.find(
        (i) => i.name === name,
      ).items?.find((i) => i.shelfLife_SEQ === shelfLife_SEQ);
      if (item) {
        item.shelfLifeName = shelfLifeName;
        item.shelfLifeDate = shelfLifeDate;
        item.shelfLifeMemo = shelfLifeMemo;
        item.IMG_LIST = IMG_LIST;
        item.shelfLifeBarcode = shelfLifeBarcode;
        item.shelfLifeImgLink = shelfLifeImgLink;
      }
    },
    removeSHELFLIFE_DATA(state, action) {
      const {
        payload: {name, shelfLife_SEQ},
      } = action;
      const items = state.SHELFLIFE_DATA?.find(
        (i) => i.name === name,
      ).items.filter((i) => i.shelfLife_SEQ !== shelfLife_SEQ);
      state.SHELFLIFE_DATA = state.SHELFLIFE_DATA.map((item) => {
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
  setSHELFLIFE_DATA,
  checkSHELFLIFE,
  cancelSHELFLIFE,
  updateSHELFLIFE_DATA,
  removeSHELFLIFE_DATA,
} = shelflifetSlice.actions;

export const getSHELFLIFE_DATA = (
  YEAR: string = moment().format('YYYY'),
  MONTH: string = moment().format('MM'),
  DAY: string = moment().format('DD'),
) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  try {
    const {data} = await api.getShelfLifeData({
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

export default shelflifetSlice.reducer;
